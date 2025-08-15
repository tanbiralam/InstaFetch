/* eslint-disable jsx-a11y/alt-text */
"use client";

import { useState, useEffect, useCallback } from "react";
import { Clock, Trash2, ExternalLink, Image, Video } from "lucide-react";
import toast from "react-hot-toast";

interface DownloadHistory {
  id: string;
  url: string;
  timestamp: number;
  type: "image" | "video" | "mixed";
  thumbnail?: string;
  author?: string;
  itemCount: number;
}

export default function RecentDownloads() {
  const [history, setHistory] = useState<DownloadHistory[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    try {
      const stored = localStorage.getItem("instafetch_history");
      if (stored) {
        const parsed = JSON.parse(stored);
        setHistory(parsed.slice(0, 10)); // Keep only last 10 items
      }
    } catch (error) {
      console.error("Failed to load history:", error);
    }
  };

  const addToHistory = useCallback(
    (item: Omit<DownloadHistory, "id" | "timestamp">) => {
      const newItem: DownloadHistory = {
        ...item,
        id: Date.now().toString(),
        timestamp: Date.now(),
      };

      setHistory((prevHistory) => {
        const updatedHistory = [
          newItem,
          ...prevHistory.filter((h) => h.url !== item.url),
        ].slice(0, 10);

        try {
          localStorage.setItem(
            "instafetch_history",
            JSON.stringify(updatedHistory)
          );
        } catch (error) {
          console.error("Failed to save history:", error);
        }

        return updatedHistory;
      });
    },
    []
  );

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("instafetch_history");
    toast.success("Download history cleared");
  };

  const removeItem = (id: string) => {
    const updatedHistory = history.filter((item) => item.id !== id);
    setHistory(updatedHistory);

    try {
      localStorage.setItem(
        "instafetch_history",
        JSON.stringify(updatedHistory)
      );
      toast.success("Item removed from history");
    } catch (error) {
      console.error("Failed to update history:", error);
    }
  };

  const openInstagramUrl = (url: string) => {
    window.open(url, "_blank");
  };

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  // Expose addToHistory function globally so other components can use it
  useEffect(() => {
    window.addToDownloadHistory = addToHistory;
  }, [addToHistory]);

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent Downloads
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({history.length})
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsVisible(!isVisible)}
              className="text-sm text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300 font-medium transition-colors"
            >
              {isVisible ? "Hide" : "Show"}
            </button>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {isVisible && (
          <div className="space-y-3 animate-fadeIn">
            {history.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
              >
                {/* Thumbnail or Icon */}
                <div className="flex-shrink-0">
                  {item.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.thumbnail}
                      alt={`Thumbnail for ${item.author || "Instagram post"}`}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                      {item.type === "video" ? (
                        <Video className="w-6 h-6 text-white" />
                      ) : item.type === "image" ? (
                        <Image className="w-6 h-6 text-white" />
                      ) : (
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-pink-600">
                            {item.itemCount}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {item.author || "Instagram Post"}
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                      {formatTimeAgo(item.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                    {item.itemCount} {item.itemCount === 1 ? "item" : "items"} •{" "}
                    {item.type}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openInstagramUrl(item.url)}
                    className="p-2 text-gray-500 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400 transition-colors"
                    title="Open original post"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                    title="Remove from history"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isVisible && history.length > 0 && (
          <div className="text-center py-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Click &ldquo;Show&rdquo; to view your recent downloads
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
