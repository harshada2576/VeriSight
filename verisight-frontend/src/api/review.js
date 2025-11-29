// API Base URL - should be set in environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

/**
 * Review API Module
 * Handles human review operations
 */

export const reviewAPI = {
  /**
   * Get review queue
   * @param {Object} params - Query parameters {page, limit, priority}
   * @returns {Promise} - Jobs pending review
   */
  async getReviewQueue(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/review/queue?${queryParams}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch review queue');
    }

    return await response.json();
  },

  /**
   * Get job for review
   * @param {string} jobId - Job ID
   * @returns {Promise} - Job details for review
   */
  async getJobForReview(jobId) {
    const response = await fetch(`${API_BASE_URL}/review/jobs/${jobId}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch job for review');
    }

    return await response.json();
  },

  /**
   * Submit review decision
   * @param {string} jobId - Job ID
   * @param {Object} reviewData - {decision: 'fake' | 'real', notes, confidence}
   * @returns {Promise} - Updated job data
   */
  async submitReview(jobId, reviewData) {
    const response = await fetch(`${API_BASE_URL}/review/jobs/${jobId}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        ...reviewData,
        reviewedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to submit review');
    }

    return await response.json();
  },

  /**
   * Get reviewer statistics
   * @returns {Promise} - Reviewer stats
   */
  async getReviewerStats() {
    const response = await fetch(`${API_BASE_URL}/review/stats`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch reviewer stats');
    }

    return await response.json();
  },

  /**
   * Get review history
   * @param {Object} params - Query parameters {page, limit}
   * @returns {Promise} - Review history
   */
  async getReviewHistory(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/review/history?${queryParams}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch review history');
    }

    return await response.json();
  },

  /**
   * Flag job for additional review
   * @param {string} jobId - Job ID
   * @param {string} reason - Reason for flagging
   * @returns {Promise}
   */
  async flagForReview(jobId, reason) {
    const response = await fetch(`${API_BASE_URL}/review/jobs/${jobId}/flag`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ reason }),
    });

    if (!response.ok) {
      throw new Error('Failed to flag job for review');
    }

    return await response.json();
  },

  /**
   * Request expert review
   * @param {string} jobId - Job ID
   * @param {string} notes - Request notes
   * @returns {Promise}
   */
  async requestExpertReview(jobId, notes) {
    const response = await fetch(`${API_BASE_URL}/review/jobs/${jobId}/request-expert`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ notes }),
    });

    if (!response.ok) {
      throw new Error('Failed to request expert review');
    }

    return await response.json();
  },
};

export default reviewAPI;
