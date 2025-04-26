/**
 * Service Factory to determine which downloader service to use based on URL
 */

// Import all services (will implement these later)
import InstagramService from '../instagram/instagramService';
import YouTubeService from '../youtube/youtubeService';
import FacebookService from '../facebook/facebookService';

class DownloaderServiceFactory {
  /**
   * Get the appropriate service for a given URL
   * @param {string} url - The URL to process
   * @returns {Object} - The appropriate service
   * @throws {Error} - If no service can handle the URL
   */
  static getService(url) {
    if (InstagramService.isValidUrl(url)) {
      return InstagramService;
    } else if (YouTubeService.isValidUrl(url)) {
      return YouTubeService;
    } else if (FacebookService.isValidUrl(url)) {
      return FacebookService;
    }
    
    throw new Error('No service available for the provided URL');
  }

  /**
   * Detect the platform from a URL
   * @param {string} url - The URL to analyze
   * @returns {string|null} - Platform name or null if not detected
   */
  static detectPlatform(url) {
    if (!url) return null;
    
    try {
      if (InstagramService.isValidUrl(url)) {
        return 'instagram';
      } else if (YouTubeService.isValidUrl(url)) {
        return 'youtube';
      } else if (FacebookService.isValidUrl(url)) {
        return 'facebook';
      }
    } catch (error) {
      console.error('Error detecting platform:', error);
    }
    
    return null;
  }
}

export default DownloaderServiceFactory;
