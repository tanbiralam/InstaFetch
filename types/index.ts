export interface MediaItem {
  id: string;
  type: "image" | "video";
  thumbnail: string;
  downloadUrl: string;
  quality: string;
  resolution: string;
  size: string;
  format: string;
}

export interface DownloadResult {
  url: string;
  caption?: string;
  author?: string;
  timestamp?: string;
  media: MediaItem[];
}

export interface DownloadHistory {
  id: string;
  url: string;
  timestamp: number;
  type: "image" | "video" | "mixed";
  thumbnail?: string;
  author?: string;
  itemCount: number;
}

export interface WindowWithHistory extends Window {
  addToDownloadHistory?: (
    item: Omit<DownloadHistory, "id" | "timestamp">
  ) => void;
}

declare global {
  interface Window {
    addToDownloadHistory?: (
      item: Omit<DownloadHistory, "id" | "timestamp">
    ) => void;
  }
}

// Apify API Types
export interface ApifyMediaResource {
  url: string;
  width?: number;
  height?: number;
}

export interface ApifyPostData {
  id: string;
  type: "GraphImage" | "GraphVideo" | "GraphSidecar";
  shortcode: string;
  caption: string;
  hashtags: string[];
  mentions: string[];
  url: string;
  commentsCount: number;
  dimensionsHeight: number;
  dimensionsWidth: number;
  displayUrl: string;
  likesCount: number;
  videoUrl?: string;
  videoViewCount?: number;
  ownerFullName: string;
  ownerUsername: string;
  ownerId: string;
  timestamp: string;
  locationName?: string;
  locationId?: string;
  childPosts?: ApifyPostData[];
  videoResources?: ApifyMediaResource[];
  imageResources?: ApifyMediaResource[];
}

export interface ApifyResponse {
  items: ApifyPostData[];
}

// API Service Types
export interface ApiServiceConfig {
  apiToken: string;
  actorId: string;
  rateLimitPerMinute: number;
  rateLimitPerHour: number;
  cacheEnabled: boolean;
  cacheTtlSeconds: number;
  logLevel: "debug" | "info" | "warn" | "error";
  enableApiLogging: boolean;
}

export interface ApiError {
  code: string;
  message: string;
  statusCode?: number;
  retryable: boolean;
  timestamp: string;
}

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export interface RateLimitInfo {
  requestsThisMinute: number;
  requestsThisHour: number;
  lastResetMinute: number;
  lastResetHour: number;
}

export interface ApiServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  cached?: boolean;
  rateLimitInfo?: RateLimitInfo;
}
