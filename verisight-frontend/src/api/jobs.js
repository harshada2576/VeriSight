// API Base URL - should be set in environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

/**
 * Jobs API Module
 * Handles all job-related operations
 */

export const jobsAPI = {
  /**
   * Get all jobs for current user
   * @param {Object} params - Query parameters {page, limit, status, sortBy}
   * @returns {Promise} - Jobs list with pagination
   */
  async getAllJobs(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/jobs?${queryParams}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }

    return await response.json();
  },

  /**
   * Get job by ID
   * @param {string} jobId - Job ID
   * @returns {Promise} - Job details
   */
  async getJobById(jobId) {
    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Job not found');
      }
      throw new Error('Failed to fetch job details');
    }

    return await response.json();
  },

  /**
   * Get job status (for polling)
   * @param {string} jobId - Job ID
   * @returns {Promise} - Job status
   */
  async getJobStatus(jobId) {
    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}/status`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch job status');
    }

    return await response.json();
  },

  /**
   * Delete job
   * @param {string} jobId - Job ID
   * @returns {Promise}
   */
  async deleteJob(jobId) {
    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete job');
    }

    return await response.json();
  },

  /**
   * Get job evidence (frames, heatmaps, etc.)
   * @param {string} jobId - Job ID
   * @param {string} type - Evidence type: 'frames' | 'heatmaps' | 'spectrogram' | 'faces'
   * @returns {Promise} - Evidence data
   */
  async getJobEvidence(jobId, type) {
    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}/evidence/${type}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${type} evidence`);
    }

    return await response.json();
  },

  /**
   * Get job analysis results
   * @param {string} jobId - Job ID
   * @returns {Promise} - Analysis results
   */
  async getAnalysisResults(jobId) {
    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}/analysis`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch analysis results');
    }

    return await response.json();
  },

  /**
   * Get dashboard statistics
   * @param {string} period - Time period: 'today' | 'week' | 'month' | 'all'
   * @returns {Promise} - Statistics data
   */
  async getDashboardStats(period = 'today') {
    const response = await fetch(`${API_BASE_URL}/jobs/stats?period=${period}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch statistics');
    }

    return await response.json();
  },

  /**
   * Retry failed job
   * @param {string} jobId - Job ID
   * @returns {Promise} - New job data
   */
  async retryJob(jobId) {
    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}/retry`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to retry job');
    }

    return await response.json();
  },

  /**
   * Export job results
   * @param {string} jobId - Job ID
   * @param {string} format - Export format: 'json' | 'csv'
   * @returns {Promise<Blob>} - Export file blob
   */
  async exportJob(jobId, format = 'json') {
    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}/export?format=${format}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to export job');
    }

    return await response.blob();
  },

  /**
   * Search jobs
   * @param {string} query - Search query
   * @param {Object} filters - Additional filters
   * @returns {Promise} - Search results
   */
  async searchJobs(query, filters = {}) {
    const params = { query, ...filters };
    const queryParams = new URLSearchParams(params).toString();
    
    const response = await fetch(`${API_BASE_URL}/jobs/search?${queryParams}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Search failed');
    }

    return await response.json();
  },
};

// Named exports for convenience
export const getAllJobs = jobsAPI.getAllJobs.bind(jobsAPI);
export const getJobById = jobsAPI.getJobById.bind(jobsAPI);
export const getJobStatus = jobsAPI.getJobStatus.bind(jobsAPI);
export const deleteJob = jobsAPI.deleteJob.bind(jobsAPI);
export const getJobEvidence = jobsAPI.getJobEvidence.bind(jobsAPI);
export const getAnalysisResults = jobsAPI.getAnalysisResults.bind(jobsAPI);
export const getDashboardStats = jobsAPI.getDashboardStats.bind(jobsAPI);
export const retryJob = jobsAPI.retryJob.bind(jobsAPI);
export const exportJob = jobsAPI.exportJob.bind(jobsAPI);
export const searchJobs = jobsAPI.searchJobs.bind(jobsAPI);

export default jobsAPI;
