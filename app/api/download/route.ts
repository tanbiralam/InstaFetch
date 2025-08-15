import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// Mock data for demonstration - In production, you would use a real Instagram API service
const mockInstagramData = {
  "https://www.instagram.com/p/sample1/": {
    url: "https://www.instagram.com/p/sample1/",
    caption:
      "Beautiful sunset at the beach! 🌅 #sunset #beach #nature #photography",
    author: "@nature_photographer",
    timestamp: "2024-01-15T18:30:00Z",
    media: [
      {
        id: "1",
        type: "image" as const,
        thumbnail: "https://picsum.photos/400/400?random=1",
        downloadUrl: "https://picsum.photos/1080/1080?random=1",
        quality: "HD",
        resolution: "1080x1080",
        size: "2.4 MB",
        format: "jpg",
      },
      {
        id: "2",
        type: "image" as const,
        thumbnail: "https://picsum.photos/400/400?random=2",
        downloadUrl: "https://picsum.photos/1080/1080?random=2",
        quality: "HD",
        resolution: "1080x1080",
        size: "2.1 MB",
        format: "jpg",
      },
    ],
  },
  "https://www.instagram.com/reel/sample2/": {
    url: "https://www.instagram.com/reel/sample2/",
    caption:
      "Amazing dance moves! 💃 Follow for more content #dance #viral #trending",
    author: "@dance_creator",
    timestamp: "2024-01-14T12:15:00Z",
    media: [
      {
        id: "3",
        type: "video" as const,
        thumbnail: "https://picsum.photos/400/400?random=3",
        downloadUrl:
          "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
        quality: "720p",
        resolution: "720x1280",
        size: "15.2 MB",
        format: "mp4",
      },
      {
        id: "4",
        type: "video" as const,
        thumbnail: "https://picsum.photos/400/400?random=3",
        downloadUrl:
          "https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_1mb.mp4",
        quality: "360p",
        resolution: "360x640",
        size: "8.1 MB",
        format: "mp4",
      },
    ],
  },
};

export async function POST(request: NextRequest) {
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

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // For demo purposes, use mock data
    // In production, you would integrate with a real Instagram API service like:
    // - RapidAPI Instagram Downloader
    // - Instagram Basic Display API
    // - Third-party scraping services

    const normalizedUrl = url.split("?")[0]; // Remove query parameters
    let mockData =
      mockInstagramData[normalizedUrl as keyof typeof mockInstagramData];

    if (!mockData) {
      // Generate random mock data for any Instagram URL
      const isVideo = url.includes("/reel/") || url.includes("/tv/");
      mockData = {
        url: normalizedUrl,
        caption: isVideo
          ? "Check out this amazing video! 🎥 #video #content #instagram"
          : "Beautiful photo shared on Instagram! 📸 #photo #instagram #content",
        author: "@instagram_user",
        timestamp: new Date().toISOString(),
        media: [
          {
            id: Date.now().toString(),
            type: isVideo ? ("video" as const) : ("image" as const),
            thumbnail: `https://picsum.photos/400/400?random=${Math.floor(
              Math.random() * 1000
            )}`,
            downloadUrl: isVideo
              ? "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
              : `https://picsum.photos/1080/1080?random=${Math.floor(
                  Math.random() * 1000
                )}`,
            quality: isVideo ? "720p" : "HD",
            resolution: isVideo ? "720x1280" : "1080x1080",
            size: isVideo ? "12.5 MB" : "2.8 MB",
            format: isVideo ? "mp4" : "jpg",
          },
        ],
      };
    }

    return NextResponse.json({
      success: true,
      data: mockData,
    });
  } catch (error) {
    console.error("Download API error:", error);
    return NextResponse.json(
      { error: "Failed to process Instagram URL. Please try again." },
      { status: 500 }
    );
  }
}

// Example of how you might integrate with a real API service:
/*
async function fetchFromRealAPI(url: string) {
  const options = {
    method: 'GET',
    url: 'https://instagram-downloader-download-instagram-videos-stories.p.rapidapi.com/index',
    params: { url },
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'instagram-downloader-download-instagram-videos-stories.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch from Instagram API');
  }
}
*/
