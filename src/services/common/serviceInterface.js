/**
 * Base interface for all download services
 * Each platform-specific service should implement these methods
 */

class DownloaderServiceInterface {
  /**
   * Validates if a URL belongs to this service
   * @param {string} url - The URL to validate
   * @returns {boolean} - True if URL is valid for this service
   */
  static isValidUrl(url) {
    throw new Error('Method not implemented');
  }

  /**
   * Extracts media information from a URL
   * @param {string} url - The URL to extract from
   * @returns {Promise<Object>} - Media information
   */
  static async getMediaInfo(url) {
    throw new Error('Method not implemented');
  }

  /**
   * Downloads media from the provided URL
   * @param {string} url - The URL to download from
   * @param {string} type - The type of media to download (video, photo, etc.)
   * @returns {Promise<Object>} - Download result
   */
  static async downloadMedia(url, type) {
    throw new Error('Method not implemented');
  }
}

export default DownloaderServiceInterface;
