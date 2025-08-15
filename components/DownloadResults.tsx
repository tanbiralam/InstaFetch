/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Download, Image, Video, FileText, Eye, Calendar } from "lucide-react";
import toast from "react-hot-toast";

interface MediaItem {
  id: string;
  type: "image" | "video";
  thumbnail: string;
  downloadUrl: string;
  quality: string;
  resolution: string;
  size: string;
  format: string;
}

interface DownloadResultsProps {
  results: {
    url: string;
    caption?: string;
    author?: string;
    timestamp?: string;
    media: MediaItem[];
  } | null;
  isLoading: boolean;
  onDownloadAnother?: () => void;
}

export default function DownloadResults({
  results,
  isLoading,
  onDownloadAnother,
}: DownloadResultsProps) {
  const [downloadingItems, setDownloadingItems] = useState<Set<string>>(
    new Set()
  );

  const handleDownload = async (item: MediaItem) => {
    setDownloadingItems((prev) => new Set(prev).add(item.id));

    try {
      // Generate filename
      const filename = `instagram_${item.type}_${item.quality}_${Date.now()}.${
        item.format
      }`;

      // Use our proxy endpoint to download the media
      const proxyUrl = `/api/media?url=${encodeURIComponent(
        item.downloadUrl
      )}&filename=${encodeURIComponent(filename)}`;

      // Create a temporary link to trigger download
      const link = document.createElement("a");
      link.href = proxyUrl;
      link.download = filename;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success(
        `${item.type === "video" ? "Video" : "Image"} download started`
      );
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download media. Please try again.");
    } finally {
      setDownloadingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });
    }
  };

  const handlePreview = (item: MediaItem) => {
    window.open(item.thumbnail, "_blank");
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8">
        <div className="card p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="space-y-3">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!results) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 animate-fadeIn">
      <div className="card p-6">
        {/* Header Info */}
        <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Download Ready
              </h2>
              {results.author && (
                <p className="text-gray-600 dark:text-gray-400 mb-1">
                  By: <span className="font-medium">{results.author}</span>
                </p>
              )}
              {results.timestamp && (
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(results.timestamp).toLocaleDateString()}
                </div>
              )}
            </div>
            <div className="text-right">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                {results.media.length}{" "}
                {results.media.length === 1 ? "item" : "items"} found
              </span>
            </div>
          </div>

          {results.caption && (
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <FileText className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                  {results.caption}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.media.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {/* Media Preview */}
              <div className="relative mb-4 group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <img
                    src={`/api/media?url=${encodeURIComponent(
                      item.thumbnail
                    )}&filename=thumbnail.jpg`}
                    alt={`${item.type} preview for ${item.id}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // First fallback: try original thumbnail URL
                      const target = e.target as HTMLImageElement;
                      if (target.src.includes("/api/media")) {
                        target.src = item.thumbnail;
                      } else {
                        // Final fallback: SVG placeholder
                        target.src = `data:image/svg+xml;base64,${btoa(`
                          <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                            <rect width="200" height="200" fill="#f3f4f6"/>
                            <text x="100" y="100" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="Arial" font-size="14">
                              ${item.type === "video" ? "Video" : "Image"}
                            </text>
                          </svg>
                        `)}`;
                      }
                    }}
                  />
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                        <Video className="w-6 h-6 text-gray-800 ml-0.5" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Preview Button */}
                <button
                  onClick={() => handlePreview(item)}
                  className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Media Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {item.type === "video" ? (
                      <Video className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    ) : (
                      // eslint-disable-next-line jsx-a11y/alt-text
                      <Image className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    )}
                    <span className="font-medium text-gray-900 dark:text-white capitalize">
                      {item.type}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 uppercase">
                    {item.format}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">
                      Quality:
                    </span>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {item.quality}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">
                      Resolution:
                    </span>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {item.resolution}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">
                      Size:
                    </span>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {item.size}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">
                      Format:
                    </span>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {item.format.toUpperCase()}
                    </p>
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => handleDownload(item)}
                  disabled={downloadingItems.has(item.id)}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200"
                >
                  {downloadingItems.has(item.id) ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Downloading...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download {item.quality}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Download All Button */}
        {results.media.length > 1 && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => {
                // Download all items with a small delay between each to avoid overwhelming the server
                results.media.forEach((item, index) => {
                  setTimeout(() => handleDownload(item), index * 500);
                });
              }}
              disabled={downloadingItems.size > 0}
              className="w-full flex items-center justify-center space-x-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200"
            >
              <Download className="w-5 h-5" />
              <span>Download All ({results.media.length} items)</span>
            </button>
          </div>
        )}

        {/* Download Another Button */}
        {onDownloadAnother && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onDownloadAnother}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-medium transition-opacity duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Download Another Video</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
