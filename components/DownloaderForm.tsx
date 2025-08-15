"use client";

import { useState, useEffect } from "react";
import { Download, Link, Loader2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

interface DownloaderFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
  inputValue?: string;
  onInputChange?: (value: string) => void;
}

export default function DownloaderForm({
  onSubmit,
  isLoading,
  inputValue,
  onInputChange,
}: DownloaderFormProps) {
  const [url, setUrl] = useState(inputValue || "");
  const [error, setError] = useState("");

  // Update local state when inputValue prop changes
  useEffect(() => {
    setUrl(inputValue || "");
  }, [inputValue]);

  const validateInstagramUrl = (url: string): boolean => {
    const instagramRegex =
      /^https?:\/\/(www\.)?(instagram\.com|instagr\.am)\/(p|reel|tv|stories)\/[A-Za-z0-9_-]+\/?(\?.*)?$/;
    return instagramRegex.test(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("Please enter an Instagram URL");
      toast.error("Please enter an Instagram URL");
      return;
    }

    if (!validateInstagramUrl(url.trim())) {
      setError("Please enter a valid Instagram URL (post, reel, or story)");
      toast.error("Please enter a valid Instagram URL");
      return;
    }

    onSubmit(url.trim());
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);

    // Update parent component if callback provided
    if (onInputChange) {
      onInputChange(newUrl);
    }

    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
        setError("");
        toast.success("URL pasted from clipboard");
      }
    } catch (err) {
      toast.error("Failed to paste from clipboard");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8 lg:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-6 leading-tight">
          Download Instagram
          <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent block sm:inline">
            {" "}
            Videos & Photos
          </span>
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
          Download Instagram videos, photos, stories, and reels in high quality.
          Fast, free, and easy to use - no registration required.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative max-w-4xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-stretch shadow-2xl rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none z-10">
                <Link className="h-6 w-6 text-gray-400" />
              </div>
              <input
                type="url"
                value={url}
                onChange={handleUrlChange}
                placeholder="Paste Instagram link here (post, reel, or story)"
                className={`w-full pl-16 pr-24 py-6 text-lg border-0 focus:outline-none focus:ring-0 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                  error ? "text-red-600 dark:text-red-400" : ""
                }`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={pasteFromClipboard}
                className="absolute inset-y-0 right-0 pr-6 flex items-center text-sm text-pink-600 dark:text-pink-400 font-medium transition-colors"
                disabled={isLoading}
              >
                Paste
              </button>
            </div>
            <button
              type="submit"
              disabled={isLoading || !url.trim()}
              className="flex items-center space-x-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 lg:px-10 py-6 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Download className="w-6 h-6" />
                  <span>Download</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-4">
            <div className="relative shadow-xl rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <Link className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="url"
                value={url}
                onChange={handleUrlChange}
                placeholder="Paste Instagram link here"
                className={`w-full pl-12 pr-20 py-5 text-base border-0 focus:outline-none focus:ring-0 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                  error ? "text-red-600 dark:text-red-400" : ""
                }`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={pasteFromClipboard}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-sm text-pink-600 dark:text-pink-400 font-medium transition-colors"
                disabled={isLoading}
              >
                Paste
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading || !url.trim()}
              className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-5 rounded-2xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200 shadow-xl"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Download className="w-6 h-6" />
                  <span>Download</span>
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-center justify-center space-x-2 text-red-600 dark:text-red-400 animate-fadeIn max-w-4xl mx-auto">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm sm:text-base text-center">{error}</span>
          </div>
        )}
      </form>
    </div>
  );
}
