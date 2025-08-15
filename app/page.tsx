"use client";

import { useState } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import axios from "axios";

import Navbar from "../components/Navbar";
import DownloaderForm from "../components/DownloaderForm";
import DownloadResults from "../components/DownloadResults";
import RecentDownloads from "../components/RecentDownloads";
import Footer from "../components/Footer";

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

interface DownloadResult {
  url: string;
  caption?: string;
  author?: string;
  timestamp?: string;
  media: MediaItem[];
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<DownloadResult | null>(null);

  const handleDownload = async (url: string) => {
    setIsLoading(true);
    setResults(null);

    try {
      const response = await axios.post("/api/download", { url });

      if (response.data.success) {
        const downloadData = response.data.data;
        setResults(downloadData);

        // Add to download history
        if (typeof window !== "undefined" && window.addToDownloadHistory) {
          const historyItem = {
            url: downloadData.url,
            type:
              downloadData.media.length > 1
                ? ("mixed" as const)
                : downloadData.media[0]?.type || ("image" as const),
            thumbnail: downloadData.media[0]?.thumbnail,
            author: downloadData.author,
            itemCount: downloadData.media.length,
          };
          window.addToDownloadHistory(historyItem);
        }

        toast.success(
          `Found ${downloadData.media.length} ${
            downloadData.media.length === 1 ? "item" : "items"
          } to download!`
        );
      } else {
        throw new Error(response.data.error || "Failed to process URL");
      }
    } catch (error) {
      console.error("Download error:", error);

      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error || "Failed to process Instagram URL";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadAnother = () => {
    setResults(null);
    setIsLoading(false);
    // Scroll back to the form
    const formElement = document.getElementById("home");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "var(--card)",
            color: "var(--foreground)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            boxShadow: "var(--card-shadow)",
          },
          success: {
            iconTheme: {
              primary: "var(--primary)",
              secondary: "white",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "white",
            },
          },
        }}
      />

      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section id="home" className="py-12">
          <DownloaderForm onSubmit={handleDownload} isLoading={isLoading} />
        </section>

        {/* Results Section */}
        {(results || isLoading) && (
          <section className="py-8">
            <DownloadResults
              results={results}
              isLoading={isLoading}
              onDownloadAnother={handleDownloadAnother}
            />
          </section>
        )}

        {/* Recent Downloads */}
        <section className="py-8">
          <RecentDownloads />
        </section>

        {/* Features Section */}
        <section id="features" className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose InstaFetch?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The most reliable and feature-rich Instagram downloader available
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card p-6 text-center hover:scale-105 transition-transform duration-200">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                100% Free
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                No registration, no hidden fees. Download unlimited content for
                free.
              </p>
            </div>

            <div className="card p-6 text-center hover:scale-105 transition-transform duration-200">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Lightning Fast
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Download Instagram content in seconds with our optimized
                servers.
              </p>
            </div>

            <div className="card p-6 text-center hover:scale-105 transition-transform duration-200">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                High Quality
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Download videos and photos in their original quality and
                resolution.
              </p>
            </div>

            <div className="card p-6 text-center hover:scale-105 transition-transform duration-200">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Mobile Friendly
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Works perfectly on all devices - desktop, tablet, and mobile.
              </p>
            </div>

            <div className="card p-6 text-center hover:scale-105 transition-transform duration-200">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                All Formats
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Support for posts, reels, stories, IGTV, and carousel content.
              </p>
            </div>

            <div className="card p-6 text-center hover:scale-105 transition-transform duration-200">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Safe & Secure
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your privacy is protected. We don&apos;t store your data or
                downloaded content.
              </p>
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section
          id="how-to-use"
          className="py-16 bg-gray-50 dark:bg-gray-800/50 rounded-3xl"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How to Use InstaFetch
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Download Instagram content in just 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Copy Instagram URL
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Go to Instagram and copy the URL of the post, reel, or story you
                want to download.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Paste & Process
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Paste the URL in the input field above and click the download
                button to process.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Download & Save
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Choose your preferred quality and download the content directly
                to your device.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Get answers to common questions about using InstaFetch
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Is InstaFetch completely free to use?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes! InstaFetch is 100% free with no hidden charges,
                registration requirements, or download limits.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                What types of Instagram content can I download?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                You can download Instagram posts (photos), reels (videos), IGTV
                videos, and carousel content. Stories may have limited
                availability.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Do you store my downloaded content?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                No, we don&apos;t store any of your downloaded content. All
                downloads are processed in real-time and saved directly to your
                device.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Is it legal to download Instagram content?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                You should only download content that you have permission to
                use. Respect copyright laws and the original creator&apos;s
                rights.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
