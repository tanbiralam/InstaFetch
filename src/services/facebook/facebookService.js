/**
 * Facebook Downloader Service
 */

import DownloaderServiceInterface from '../common/serviceInterface';
import { isValidUrl, handleServiceError, createSafeFilename } from '../common/utils';
import axios from 'axios';

class FacebookService extends DownloaderServiceInterface {
  /**
   * Validates if a URL is a Facebook URL
   * @param {string} url - The URL to validate
   * @returns {boolean} - True if URL is a valid Facebook URL
   */
  static isValidUrl(url) {
    if (!isValidUrl(url)) return false;
    
    try {
      const { hostname, pathname } = new URL(url);
      
      // Check for Facebook domains
      const isFacebookDomain = [
        'facebook.com',
        'www.facebook.com',
        'm.facebook.com',
        'fb.com',
        'fb.watch',
        'web.facebook.com'
      ].some(domain => hostname.includes(domain));
      
      // Check for valid Facebook video paths
      const isVideoPath = [
        '/watch',
        '/video',
        '/reel',
        '/story',
        '/posts'
      ].some(path => pathname.includes(path));
      
      return isFacebookDomain && isVideoPath;
    } catch (error) {
      return false;
    }
  }

  /**
   * Extracts media information from a Facebook URL
   * @param {string} url - The Facebook URL
   * @returns {Promise<Object>} - Media information
   */
  static async getMediaInfo(url) {
    try {
      // Determine content type based on URL pattern
      let type = 'video';
      
      if (url.includes('/reel')) {
        type = 'reel';
      } else if (url.includes('/story')) {
        type = 'story';
      } else if (url.includes('/photo')) {
        type = 'photo';
      }
      
      return {
        url,
        type,
        platform: 'facebook',
        isValid: true
      };
    } catch (error) {
      return handleServiceError(error, 'Facebook');
    }
  }

  /**
   * Downloads media from a Facebook URL
   * @param {string} url - The Facebook URL
   * @param {string} quality - The quality to download (high, medium, low)
   * @returns {Promise<Object>} - Downloaded media data
   */
  static async downloadMedia(url, quality = 'high') {
    try {
      // In a real implementation, you would use a Facebook API or library here
      // This is a placeholder for the API integration
      const apiUrl = 'https://facebook-video-and-reel-downloader.p.rapidapi.com/app/main.php';
      
      const options = {
        method: 'GET',
        url: apiUrl,
        params: {
          url: url
        },
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_FACEBOOK_API_KEY || import.meta.env.VITE_API_KEY,
          'X-RapidAPI-Host': 'facebook-video-and-reel-downloader.p.rapidapi.com'
        }
      };
      
      // Placeholder for actual API call
      // const response = await axios.request(options);
      // const data = response.data;
      
      // For demonstration purposes only - in a real implementation, this would use actual API data
      const mockData = {
        success: true,
        title: 'Facebook Video',
        thumbnail: 'https://example.com/thumbnail.jpg',
        formats: [
          { quality: 'HD', url: `${url}/download/hd` },
          { quality: 'SD', url: `${url}/download/sd` }
        ]
      };
      
      // Process the response and upload to Cloudinary (similar to your Instagram implementation)
      // In a real implementation, you would process the response and return download links
      
      // Map quality parameter to available formats
      const qualityMap = {
        'high': 'HD',
        'medium': 'SD',
        'low': 'SD'
      };
      
      const selectedQuality = qualityMap[quality] || 'HD';
      const selectedFormat = mockData.formats.find(f => f.quality === selectedQuality) || mockData.formats[0];
      
      return {
        success: true,
        data: {
          title: mockData.title,
          thumbnail: mockData.thumbnail,
          downloadUrl: selectedFormat.url,
          availableQualities: mockData.formats.map(f => f.quality),
          fileName: createSafeFilename(mockData.title) + '.mp4'
        },
        platform: 'facebook',
        type: 'video'
      };
    } catch (error) {
      return handleServiceError(error, 'Facebook');
    }
  }
}

export default FacebookService;
