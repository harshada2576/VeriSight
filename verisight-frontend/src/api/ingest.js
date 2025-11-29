// API Base URL - should be set in environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

/**
 * Video Ingest API Module
 * Handles video upload and URL submission for analysis
 */

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Authorization': `Bearer ${token}`,
  };
};

export const ingestAPI = {
  /**
   * Upload video file for analysis
   * @param {FormData} formData - FormData with video file
   * @param {Function} onProgress - Progress callback
   * @returns {Promise} - Job data
   */
  async uploadVideo(formData, onProgress) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      // Track upload progress
      if (onProgress) {
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const percentComplete = (e.loaded / e.total) * 100;
            onProgress(percentComplete);
          }
        });
      }

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch (error) {
            reject(new Error('Invalid response from server'));
          }
        } else {
          try {
            const error = JSON.parse(xhr.responseText);
            reject(new Error(error.message || 'Upload failed'));
          } catch {
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Network error during upload'));
      });

      xhr.addEventListener('abort', () => {
        reject(new Error('Upload cancelled'));
      });

      const token = localStorage.getItem('authToken');
      xhr.open('POST', `${API_BASE_URL}/ingest/upload`);
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.send(formData);
    });
  },

  /**
   * Submit video URL for analysis
   * @param {string} url - Video URL
   * @returns {Promise} - Job data
   */
  async submitVideoURL(url) {
    const response = await fetch(`${API_BASE_URL}/ingest/url`, {
      method: 'POST',
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'URL submission failed');
    }

    return await response.json();
  },

  /**
   * Get supported video formats
   * @returns {Promise} - Supported formats and limits
   */
  async getSupportedFormats() {
    const response = await fetch(`${API_BASE_URL}/ingest/formats`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch supported formats');
    }

    return await response.json();
  },

  /**
   * Validate video before upload
   * @param {File} file - Video file
   * @returns {Promise<boolean>} - Validation result
   */
  async validateVideo(file) {
    const formData = new FormData();
    formData.append('video', file);

    const response = await fetch(`${API_BASE_URL}/ingest/validate`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Validation failed');
    }

    const result = await response.json();
    return result.valid;
  },

  /**
   * Get upload quota/limits for current user
   * @returns {Promise} - Quota information
   */
  async getUploadQuota() {
    const response = await fetch(`${API_BASE_URL}/ingest/quota`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch upload quota');
    }

    return await response.json();
  },
};

export default ingestAPI;
