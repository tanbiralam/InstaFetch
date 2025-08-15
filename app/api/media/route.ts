import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mediaUrl = searchParams.get("url");
  const filename = searchParams.get("filename");

  if (!mediaUrl) {
    return NextResponse.json(
      { error: "Media URL is required" },
      { status: 400 }
    );
  }

  try {
    // Fetch the media from Instagram's servers
    const response = await fetch(mediaUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept: "*/*",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "cross-site",
      },
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch media: ${response.status} ${response.statusText}`
      );
      return NextResponse.json(
        { error: "Failed to fetch media from Instagram" },
        { status: response.status }
      );
    }

    // Get the content type from the response
    const contentType =
      response.headers.get("content-type") || "application/octet-stream";
    const contentLength = response.headers.get("content-length");

    // Create response headers for download
    const headers = new Headers({
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${
        filename || "instagram_media"
      }"`,
      "Cache-Control": "public, max-age=31536000", // Cache for 1 year
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type",
    });

    if (contentLength) {
      headers.set("Content-Length", contentLength);
    }

    // Stream the response body
    const body = response.body;

    if (!body) {
      return NextResponse.json(
        { error: "No content received" },
        { status: 500 }
      );
    }

    return new NextResponse(body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Error proxying media:", error);
    return NextResponse.json(
      { error: "Internal server error while fetching media" },
      { status: 500 }
    );
  }
}

// Handle preflight requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
