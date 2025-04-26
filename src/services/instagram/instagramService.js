/**
 * Instagram Downloader Service
 * Adapts existing Instagram functionality into the new service architecture
 */

import DownloaderServiceInterface from '../common/serviceInterface';
import { isValidUrl, handleServiceError } from '../common/utils';
import { getData } from '../../../utils/upload'; // Using your existing implementation

class InstagramService extends DownloaderServiceInterface {
  /**
   * Validates if a URL is an Instagram URL
   * @param {string} url - The URL to validate
   * @returns {boolean} - True if URL is a valid Instagram URL
   */
  static isValidUrl(url) {
    if (!isValidUrl(url)) return false;
    
    try {
      const { hostname } = new URL(url);
      return hostname.includes('instagram.com') || 
             hostname.includes('instagr.am') || 
             hostname.includes('ig.me');
    } catch (error) {
      return false;
    }
  }

  /**
   * Extracts media information from an Instagram URL
   * @param {string} url - The Instagram URL
   * @returns {Promise<Object>} - Media information
   */
  static async getMediaInfo(url) {
    try {
      // Determine content type based on URL pattern
      let type = 'photo';
      
      if (url.includes('/reel/') || url.includes('/reels/')) {
        type = 'reel';
      } else if (url.includes('/tv/') || url.includes('/igtv/')) {
        type = 'igtv';
      } else if (url.includes('/stories/')) {
        type = 'story';
      } else if (url.includes('/p/')) {
        // Could be photo or video, default to video and let API handle it
        type = 'video';
      }
      
      return {
        url,
        type,
        platform: 'instagram',
        isValid: true
      };
    } catch (error) {
      return handleServiceError(error, 'Instagram');
    }
  }

  /**
   * Downloads media from an Instagram URL
   * @param {string} url - The Instagram URL
   * @param {string} type - The type of media (video, photo, reel, story, igtv)
   * @returns {Promise<Object>} - Downloaded media data
   */
  static async downloadMedia(url, type) {
    try {
      // Use the existing getData function from your upload.js
      const result = await getData(url, type.toLowerCase());
      
      if (!result) {
        throw new Error('Failed to download content');
      }
      
      return {
        success: true,
        data: result,
        platform: 'instagram',
        type: type.toLowerCase()
      };
    } catch (error) {
      return handleServiceError(error, 'Instagram');
    }
  }
}

export default InstagramService;
