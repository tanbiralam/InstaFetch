import { ApifyClient } from "apify-client";
import {
  ApiServiceConfig,
  ApiServiceResponse,
  ApifyResponse,
  ApifyPostData,
  DownloadResult,
  MediaItem,
  ApiError,
  CacheEntry,
  RateLimitInfo,
} from "@/types";

/**
 * Comprehensive API Service for Instagram data fetching using Apify
 * Includes error handling, retry logic, rate limiting, caching, and logging
 */
export class InstagramApiService {
  private client: ApifyClient;
  private config: ApiServiceConfig;
  private cache: Map<string, CacheEntry<DownloadResult>> = new Map();
  private rateLimitInfo: RateLimitInfo = {
    requestsThisMinute: 0,
    requestsThisHour: 0,
    lastResetMinute: Date.now(),
    lastResetHour: Date.now(),
  };

  constructor(config: ApiServiceConfig) {
    this.config = config;
    this.client = new ApifyClient({
      token: config.apiToken,
    });

    this.log("info", "Instagram API Service initialized", {
      config: this.sanitizeConfig(config),
    });
  }

  /**
   * Main method to fetch Instagram post data
   */
  async fetchInstagramData(
    url: string
  ): Promise<ApiServiceResponse<DownloadResult>> {
    const startTime = Date.now();
    const cacheKey = this.generateCacheKey(url);

    try {
      // Check cache first
      if (this.config.cacheEnabled) {
        const cachedResult = this.getFromCache(cacheKey);
        if (cachedResult) {
          this.log("info", "Cache hit for URL", { url, cacheKey });
          return {
            success: true,
            data: cachedResult,
            cached: true,
            rateLimitInfo: this.getRateLimitInfo(),
          };
        }
      }

      // Check rate limits
      const rateLimitCheck = this.checkRateLimit();
      if (!rateLimitCheck.allowed) {
        const error: ApiError = {
          code: "RATE_LIMIT_EXCEEDED",
          message: `Rate limit exceeded. ${rateLimitCheck.message}`,
          statusCode: 429,
          retryable: true,
          timestamp: new Date().toISOString(),
        };

        this.log("warn", "Rate limit exceeded", {
          url,
          rateLimitInfo: this.rateLimitInfo,
        });
        return {
          success: false,
          error,
          rateLimitInfo: this.getRateLimitInfo(),
        };
      }

      // Increment rate limit counters
      this.incrementRateLimit();

      // Fetch data from Apify with retry logic
      const result = await this.fetchWithRetry(url);

      // Transform data
      const transformedData = this.transformApifyResponse(result, url);

      // Cache the result
      if (this.config.cacheEnabled && transformedData) {
        this.setCache(cacheKey, transformedData);
      }

      const duration = Date.now() - startTime;
      this.log("info", "Successfully fetched Instagram data", {
        url,
        duration,
        mediaCount: transformedData?.media.length || 0,
      });

      return {
        success: true,
        data: transformedData || undefined,
        cached: false,
        rateLimitInfo: this.getRateLimitInfo(),
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      const apiError = this.handleError(error);

      this.log("error", "Failed to fetch Instagram data", {
        url,
        duration,
        error: apiError,
      });

      return {
        success: false,
        error: apiError,
        rateLimitInfo: this.getRateLimitInfo(),
      };
    }
  }

  /**
   * Fetch data with exponential backoff retry logic
   */
  private async fetchWithRetry(
    url: string,
    maxRetries: number = 3
  ): Promise<ApifyResponse> {
    let lastError: Error;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        this.log("debug", `Attempt ${attempt} to fetch data`, {
          url,
          attempt,
          maxRetries,
        });

        const input = {
          directUrls: [url],
          resultsType: "posts",
          resultsLimit: 200,
          searchType: "hashtag",
          searchLimit: 1,
          addParentData: true, // Enable parent data to get carousel info
          enhanceUserInformation: true,
          isUserTaggedFeedURL: false,
          onlyPostsWithLocation: false,
          likedByInfluencer: false,
        };

        // Run the Actor and wait for it to finish
        const run = await this.client.actor(this.config.actorId).call(input);

        if (!run.defaultDatasetId) {
          throw new Error("No dataset ID returned from Apify actor");
        }

        // Fetch results from the dataset
        const { items } = await this.client
          .dataset(run.defaultDatasetId)
          .listItems();

        this.log("debug", "Successfully fetched from Apify", {
          url,
          attempt,
          itemCount: items.length,
          datasetId: run.defaultDatasetId,
        });

        return { items: items as unknown as ApifyPostData[] };
      } catch (error) {
        lastError = error as Error;

        this.log("warn", `Attempt ${attempt} failed`, {
          url,
          attempt,
          maxRetries,
          error: lastError.message,
        });

        // Don't retry on the last attempt
        if (attempt === maxRetries) {
          break;
        }

        // Exponential backoff: 1s, 2s, 4s
        const delay = Math.pow(2, attempt - 1) * 1000;
        this.log("debug", `Waiting ${delay}ms before retry`, {
          url,
          attempt,
          delay,
        });
        await this.sleep(delay);
      }
    }

    throw lastError!;
  }

  /**
   * Transform Apify response to application format
   */
  private transformApifyResponse(
    apifyResponse: ApifyResponse,
    originalUrl: string
  ): DownloadResult | null {
    if (!apifyResponse.items || apifyResponse.items.length === 0) {
      this.log("warn", "No items found in Apify response", { originalUrl });
      return null;
    }

    const post = apifyResponse.items[0]; // Take the first post
    const media: MediaItem[] = [];

    // Handle different post types
    if (post.type === "GraphImage") {
      // Single image post
      media.push(this.createMediaItem(post, "image"));
    } else if (post.type === "GraphVideo") {
      // Video post
      media.push(this.createMediaItem(post, "video"));
    } else if (post.type === "GraphSidecar") {
      // Carousel post with multiple media
      this.log("debug", "Found carousel post", {
        postId: post.id,
        hasChildPosts: !!post.childPosts,
        childPostsLength: post.childPosts?.length || 0,
        postKeys: Object.keys(post),
      });

      if (post.childPosts && post.childPosts.length > 0) {
        post.childPosts.forEach((childPost, index) => {
          const mediaType = childPost.type === "GraphVideo" ? "video" : "image";
          media.push(this.createMediaItem(childPost, mediaType, index));
        });

        this.log("debug", "Processing carousel post", {
          childPostsCount: post.childPosts.length,
          mediaItemsCreated: media.length,
        });
      } else {
        // Fallback: try to extract multiple media from the main post
        this.log("debug", "No childPosts found, trying alternative approach");

        // Check if there are multiple image resources
        if (post.imageResources && post.imageResources.length > 1) {
          post.imageResources.forEach((imageResource, index) => {
            const mediaItem: MediaItem = {
              id: `${post.id}_img_${index}`,
              type: "image",
              thumbnail: imageResource.url,
              downloadUrl: imageResource.url,
              quality: "HD",
              resolution: `${imageResource.width}x${imageResource.height}`,
              size: this.estimateImageSize(
                imageResource.width || 0,
                imageResource.height || 0
              ),
              format: "jpg",
            };
            media.push(mediaItem);
          });
        } else {
          // Single media item fallback
          media.push(
            this.createMediaItem(post, post.videoUrl ? "video" : "image")
          );
        }
      }
    }

    // If no media was processed, create a fallback
    if (media.length === 0) {
      media.push(this.createMediaItem(post, post.videoUrl ? "video" : "image"));
    }

    const result: DownloadResult = {
      url: originalUrl,
      caption: post.caption || undefined,
      author: post.ownerUsername ? `@${post.ownerUsername}` : undefined,
      timestamp: post.timestamp || undefined,
      media,
    };

    this.log("debug", "Transformed Apify response", {
      originalUrl,
      mediaCount: media.length,
      postType: post.type,
    });

    return result;
  }

  /**
   * Create a MediaItem from Apify post data
   */
  private createMediaItem(
    post: ApifyPostData,
    type: "image" | "video",
    index: number = 0
  ): MediaItem {
    const id = `${post.id}_${index}`;
    const thumbnail = post.displayUrl;

    let downloadUrl: string;
    let quality: string;
    let resolution: string;
    let format: string;
    let size: string;

    if (type === "video" && post.videoUrl) {
      downloadUrl = post.videoUrl;
      quality = this.determineVideoQuality(
        post.dimensionsWidth,
        post.dimensionsHeight
      );
      resolution = `${post.dimensionsWidth}x${post.dimensionsHeight}`;
      format = "mp4";
      size = this.estimateVideoSize(
        post.dimensionsWidth,
        post.dimensionsHeight
      );
    } else {
      // Use the highest quality image available
      downloadUrl = this.getBestImageUrl(post);
      quality = "HD";
      resolution = `${post.dimensionsWidth}x${post.dimensionsHeight}`;
      format = "jpg";
      size = this.estimateImageSize(
        post.dimensionsWidth,
        post.dimensionsHeight
      );
    }

    return {
      id,
      type,
      thumbnail,
      downloadUrl,
      quality,
      resolution,
      size,
      format,
    };
  }

  /**
   * Get the best available image URL
   */
  private getBestImageUrl(post: ApifyPostData): string {
    // Try to get the highest resolution image
    if (post.imageResources && post.imageResources.length > 0) {
      // Sort by resolution (width * height) and take the largest
      const bestImage = post.imageResources
        .filter((img) => img.width && img.height)
        .sort((a, b) => b.width! * b.height! - a.width! * a.height!)[0];

      if (bestImage) {
        return bestImage.url;
      }
    }

    // Fallback to display URL
    return post.displayUrl;
  }

  /**
   * Determine video quality based on dimensions
   */
  private determineVideoQuality(width: number, height: number): string {
    const pixels = width * height;

    if (pixels >= 1920 * 1080) return "1080p";
    if (pixels >= 1280 * 720) return "720p";
    if (pixels >= 854 * 480) return "480p";
    if (pixels >= 640 * 360) return "360p";
    return "240p";
  }

  /**
   * Estimate file sizes based on dimensions
   */
  private estimateImageSize(width: number, height: number): string {
    const pixels = width * height;
    const estimatedBytes = pixels * 0.5; // Rough estimate for JPEG
    return this.formatFileSize(estimatedBytes);
  }

  private estimateVideoSize(width: number, height: number): string {
    const pixels = width * height;
    const estimatedBytes = pixels * 0.1 * 30; // Rough estimate for 30 seconds of video
    return this.formatFileSize(estimatedBytes);
  }

  private formatFileSize(bytes: number): string {
    const sizes = ["B", "KB", "MB", "GB"];
    if (bytes === 0) return "0 B";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  }

  /**
   * Rate limiting functionality
   */
  private checkRateLimit(): { allowed: boolean; message?: string } {
    const now = Date.now();

    // Reset counters if needed
    if (now - this.rateLimitInfo.lastResetMinute >= 60000) {
      this.rateLimitInfo.requestsThisMinute = 0;
      this.rateLimitInfo.lastResetMinute = now;
    }

    if (now - this.rateLimitInfo.lastResetHour >= 3600000) {
      this.rateLimitInfo.requestsThisHour = 0;
      this.rateLimitInfo.lastResetHour = now;
    }

    // Check limits
    if (
      this.rateLimitInfo.requestsThisMinute >= this.config.rateLimitPerMinute
    ) {
      return {
        allowed: false,
        message: `Minute limit of ${this.config.rateLimitPerMinute} requests exceeded`,
      };
    }

    if (this.rateLimitInfo.requestsThisHour >= this.config.rateLimitPerHour) {
      return {
        allowed: false,
        message: `Hour limit of ${this.config.rateLimitPerHour} requests exceeded`,
      };
    }

    return { allowed: true };
  }

  private incrementRateLimit(): void {
    this.rateLimitInfo.requestsThisMinute++;
    this.rateLimitInfo.requestsThisHour++;
  }

  private getRateLimitInfo(): RateLimitInfo {
    return { ...this.rateLimitInfo };
  }

  /**
   * Caching functionality
   */
  private generateCacheKey(url: string): string {
    // Normalize URL for consistent caching
    const normalizedUrl = url.split("?")[0].toLowerCase();
    return `instagram_${Buffer.from(normalizedUrl).toString("base64")}`;
  }

  private getFromCache(key: string): DownloadResult | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const now = Date.now();
    if (now - entry.timestamp > entry.ttl * 1000) {
      this.cache.delete(key);
      this.log("debug", "Cache entry expired", { key });
      return null;
    }

    return entry.data;
  }

  private setCache(key: string, data: DownloadResult): void {
    const entry: CacheEntry<DownloadResult> = {
      data,
      timestamp: Date.now(),
      ttl: this.config.cacheTtlSeconds,
    };

    this.cache.set(key, entry);
    this.log("debug", "Data cached", { key, ttl: this.config.cacheTtlSeconds });

    // Clean up old entries periodically
    if (this.cache.size > 100) {
      this.cleanupCache();
    }
  }

  private cleanupCache(): void {
    const now = Date.now();
    let cleaned = 0;

    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl * 1000) {
        this.cache.delete(key);
        cleaned++;
      }
    }

    if (cleaned > 0) {
      this.log("debug", "Cache cleanup completed", {
        cleaned,
        remaining: this.cache.size,
      });
    }
  }

  /**
   * Error handling
   */
  private handleError(error: unknown): ApiError {
    const timestamp = new Date().toISOString();

    if (error instanceof Error) {
      // Determine if error is retryable
      const retryable = this.isRetryableError(error);

      // Map common errors to appropriate codes and status codes
      let code = "UNKNOWN_ERROR";
      let statusCode = 500;

      if (
        error.message.includes("rate limit") ||
        error.message.includes("429")
      ) {
        code = "RATE_LIMIT_EXCEEDED";
        statusCode = 429;
      } else if (
        error.message.includes("unauthorized") ||
        error.message.includes("401")
      ) {
        code = "UNAUTHORIZED";
        statusCode = 401;
      } else if (
        error.message.includes("not found") ||
        error.message.includes("404")
      ) {
        code = "NOT_FOUND";
        statusCode = 404;
      } else if (error.message.includes("timeout")) {
        code = "TIMEOUT";
        statusCode = 408;
      } else if (
        error.message.includes("network") ||
        error.message.includes("connection")
      ) {
        code = "NETWORK_ERROR";
        statusCode = 503;
      }

      return {
        code,
        message: error.message,
        statusCode,
        retryable,
        timestamp,
      };
    }

    return {
      code: "UNKNOWN_ERROR",
      message: "An unknown error occurred",
      statusCode: 500,
      retryable: false,
      timestamp,
    };
  }

  private isRetryableError(error: Error): boolean {
    const retryablePatterns = [
      /timeout/i,
      /network/i,
      /connection/i,
      /503/,
      /502/,
      /500/,
    ];

    return retryablePatterns.some((pattern) => pattern.test(error.message));
  }

  /**
   * Logging functionality
   */
  private log(
    level: "debug" | "info" | "warn" | "error",
    message: string,
    meta?: Record<string, unknown>
  ): void {
    if (!this.config.enableApiLogging) return;

    const levels = { debug: 0, info: 1, warn: 2, error: 3 };
    const configLevels = { debug: 0, info: 1, warn: 2, error: 3 };

    if (levels[level] < configLevels[this.config.logLevel]) return;

    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      service: "InstagramApiService",
      message,
      ...meta,
    };

    console[level === "debug" ? "log" : level](
      JSON.stringify(logEntry, null, 2)
    );
  }

  /**
   * Utility methods
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private sanitizeConfig(config: ApiServiceConfig): Partial<ApiServiceConfig> {
    return {
      ...config,
      apiToken: config.apiToken ? "***REDACTED***" : undefined,
    };
  }

  /**
   * Public utility methods
   */
  public getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }

  public clearCache(): void {
    this.cache.clear();
    this.log("info", "Cache cleared");
  }

  public getRateLimitStatus(): RateLimitInfo {
    return this.getRateLimitInfo();
  }
}

/**
 * Factory function to create configured API service instance
 */
export function createInstagramApiService(): InstagramApiService {
  const config: ApiServiceConfig = {
    apiToken: process.env.APIFY_API_TOKEN || "",
    actorId: "shu8hvrXbJbY3Eb9W", // Instagram scraper actor ID
    rateLimitPerMinute: parseInt(
      process.env.RATE_LIMIT_REQUESTS_PER_MINUTE || "10"
    ),
    rateLimitPerHour: parseInt(
      process.env.RATE_LIMIT_REQUESTS_PER_HOUR || "100"
    ),
    cacheEnabled: process.env.ENABLE_CACHE === "true",
    cacheTtlSeconds: parseInt(process.env.CACHE_TTL_SECONDS || "300"),
    logLevel:
      (process.env.LOG_LEVEL as "debug" | "info" | "warn" | "error") || "info",
    enableApiLogging: process.env.ENABLE_API_LOGGING === "true",
  };

  if (!config.apiToken) {
    throw new Error("APIFY_API_TOKEN environment variable is required");
  }

  return new InstagramApiService(config);
}
