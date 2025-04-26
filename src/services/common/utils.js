/**
 * Common utility functions for all downloader services
 */

/**
 * Validates a URL format
 * @param {string} url - The URL to validate
 * @returns {boolean} - True if URL is valid
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Extracts domain from a URL
 * @param {string} url - The URL to process
 * @returns {string|null} - Domain name or null if invalid
 */
export const extractDomain = (url) => {
  try {
    const { hostname } = new URL(url);
    return hostname;
  } catch (error) {
    return null;
  }
};

/**
 * Formats file size for display
 * @param {number} bytes - Size in bytes
 * @returns {string} - Formatted size (e.g., "4.2 MB")
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Generates a safe filename from a title
 * @param {string} title - Original title
 * @returns {string} - Safe filename
 */
export const createSafeFilename = (title) => {
  if (!title) return 'download';
  
  // Remove invalid filename characters
  return title
    .replace(/[\\/:*?"<>|]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, 100); // Limit length
};

/**
 * Handles errors consistently across services
 * @param {Error} error - The error object
 * @param {string} service - Service name
 * @returns {Object} - Standardized error object
 */
export const handleServiceError = (error, service) => {
  console.error(`${service} service error:`, error);
  
  // Create user-friendly error message
  let userMessage = 'An error occurred while processing your request.';
  
  if (error.message.includes('network')) {
    userMessage = 'Network error. Please check your internet connection.';
  } else if (error.message.includes('not found') || error.response?.status === 404) {
    userMessage = 'The requested content could not be found.';
  } else if (error.message.includes('permission') || error.response?.status === 403) {
    userMessage = 'Unable to access this content. It may be private or restricted.';
  }
  
  return {
    success: false,
    error: userMessage,
    details: process.env.NODE_ENV === 'development' ? error.message : undefined
  };
};
