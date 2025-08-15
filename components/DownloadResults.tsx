"use client";

import { useState } from "react";
import {
  Download,
  Image,
  Video,
  FileText,
  Eye,
  Clock,
  Calendar,
} from "lucide-react";
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
}

export default function DownloadResults({
  results,
  isLoading,
}: DownloadResultsProps) {
  const [downloadingItems, setDownloadingItems] = useState<Set<string>>(
    new Set()
  );

  const handleDownload = async (item: MediaItem) => {
    setDownloadingItems((prev) => new Set(prev).add(item.id));

    try {
      // Create a temporary link to trigger download
      const link = document.createElement("a");
      link.href = item.downloadUrl;
      link.download = `instagram_${item.type}_${item.quality}.${item.format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success(
        `${item.type === "video" ? "Video" : "Image"} download started`
      );
    } catch (error) {
      toast.error("Failed to download media");
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
                    src={item.thumbnail}
                    alt={`${item.type} preview`}
                    className="w-full h-full object-cover"
                  />
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                        <Video className="w-6 h-6 text-gray-800" />
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
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 btn-hover-lift"
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
              onClick={() => results.media.forEach(handleDownload)}
              className="w-full flex items-center justify-center space-x-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 btn-hover-lift"
            >
              <Download className="w-5 h-5" />
              <span>Download All ({results.media.length} items)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
