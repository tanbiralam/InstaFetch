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
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Download Instagram
          <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            {" "}
            Videos & Photos
          </span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Download Instagram videos, photos, stories, and reels in high quality.
          Fast, free, and easy to use - no registration required.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="flex items-center">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Link className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="url"
                value={url}
                onChange={handleUrlChange}
                placeholder="Paste Instagram link here (post, reel, or story)"
                className={`w-full pl-12 pr-20 py-4 text-lg border-2 rounded-l-2xl md:rounded-l-full md:rounded-r-none rounded-r-2xl focus:outline-none focus:ring-0 transition-all duration-200 ${
                  error
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-pink-500 dark:border-gray-600 dark:focus:border-pink-400"
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={pasteFromClipboard}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-sm text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300 font-medium transition-colors bg-white dark:bg-gray-800 rounded-r-lg"
                disabled={isLoading}
              >
                Paste
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading || !url.trim()}
              className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-r-full font-semibold text-lg hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 btn-hover-lift"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>Download</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile Download Button */}
          <button
            type="submit"
            disabled={isLoading || !url.trim()}
            className="md:hidden w-full mt-4 flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Download</span>
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 animate-fadeIn">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}
      </form>
    </div>
  );
}
