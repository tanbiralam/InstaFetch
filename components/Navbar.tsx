"use client";

import { Download, Instagram, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl gradient-primary">
              <Instagram className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                InstaFetch
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                Instagram Downloader
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-gray-700 hover:text-pink-600 dark:text-gray-300 dark:hover:text-pink-400 font-medium transition-colors"
            >
              Home
            </a>
            <a
              href="#how-to-use"
              className="text-gray-700 hover:text-pink-600 dark:text-gray-300 dark:hover:text-pink-400 font-medium transition-colors"
            >
              How to Use
            </a>
            <a
              href="#features"
              className="text-gray-700 hover:text-pink-600 dark:text-gray-300 dark:hover:text-pink-400 font-medium transition-colors"
            >
              Features
            </a>
            <a
              href="#faq"
              className="text-gray-700 hover:text-pink-600 dark:text-gray-300 dark:hover:text-pink-400 font-medium transition-colors"
            >
              FAQ
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-fadeIn">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
              <a
                href="#home"
                className="block px-3 py-2 text-gray-700 hover:text-pink-600 dark:text-gray-300 dark:hover:text-pink-400 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#how-to-use"
                className="block px-3 py-2 text-gray-700 hover:text-pink-600 dark:text-gray-300 dark:hover:text-pink-400 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                How to Use
              </a>
              <a
                href="#features"
                className="block px-3 py-2 text-gray-700 hover:text-pink-600 dark:text-gray-300 dark:hover:text-pink-400 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#faq"
                className="block px-3 py-2 text-gray-700 hover:text-pink-600 dark:text-gray-300 dark:hover:text-pink-400 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </a>
              <div className="px-3 py-2">
                <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2.5 rounded-full font-medium hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200">
                  <Download className="w-4 h-4" />
                  <span>Download Now</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
