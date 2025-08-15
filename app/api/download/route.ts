import { NextRequest, NextResponse } from "next/server";
import { createInstagramApiService } from "@/lib/api-service";
import { DownloadResult } from "@/types";

// Initialize API service
const apiService = createInstagramApiService();

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Validate Instagram URL
    const instagramRegex =
      /^https?:\/\/(www\.)?(instagram\.com|instagr\.am)\/(p|reel|tv|stories)\/[A-Za-z0-9_-]+\/?(\?.*)?$/;
    if (!instagramRegex.test(url)) {
      return NextResponse.json(
        { error: "Invalid Instagram URL" },
        { status: 400 }
      );
    }

    // Log request
    console.log(`[API] Processing Instagram URL: ${url}`);

    // Fetch data using the API service
    const apiResponse = await apiService.fetchInstagramData(url);

    if (!apiResponse.success) {
      const duration = Date.now() - startTime;
      console.error(
        `[API] Request failed after ${duration}ms:`,
        apiResponse.error
      );

      // Return appropriate error response based on the error type
      const statusCode = apiResponse.error?.statusCode || 500;
      return NextResponse.json(
        {
          error:
            apiResponse.error?.message ||
            "Failed to process Instagram URL. Please try again.",
          code: apiResponse.error?.code,
          meta: {
            duration,
            source: "api_error",
            rateLimitInfo: apiResponse.rateLimitInfo,
          },
        },
        { status: statusCode }
      );
    }

    const duration = Date.now() - startTime;
    console.log(
      `[API] Request completed in ${duration}ms (cached: ${apiResponse.cached})`
    );

    // Return successful response with metadata
    const response = {
      success: true,
      data: apiResponse.data,
      meta: {
        cached: apiResponse.cached || false,
        duration,
        rateLimitInfo: apiResponse.rateLimitInfo,
        source: apiResponse.cached ? "cache" : "api",
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[API] Unexpected error after ${duration}ms:`, error);

    return NextResponse.json(
      {
        error: "An unexpected error occurred. Please try again.",
        meta: {
          duration,
          source: "system_error",
        },
      },
      { status: 500 }
    );
  }
}

/**
 * Health check endpoint to verify API service status
 */
export async function GET() {
  try {
    const status: Record<string, unknown> = {
      service: "Instagram Download API",
      timestamp: new Date().toISOString(),
      apiServiceAvailable: true,
      environment: process.env.NODE_ENV || "development",
      cacheStats: apiService.getCacheStats(),
      rateLimitStatus: apiService.getRateLimitStatus(),
    };

    return NextResponse.json(status);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Health check failed", details: errorMessage },
      { status: 500 }
    );
  }
}
