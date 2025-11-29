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
 * Verification API Module
 * Handles verification pack generation and cryptographic operations
 */

export const verificationAPI = {
  /**
   * Get verification pack for job
   * @param {string} jobId - Job ID
   * @returns {Promise} - Verification pack data
   */
  async getVerificationPack(jobId) {
    const response = await fetch(`${API_BASE_URL}/verification/${jobId}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch verification pack');
    }

    return await response.json();
  },

  /**
   * Generate verification pack
   * @param {string} jobId - Job ID
   * @returns {Promise} - Generated verification pack
   */
  async generateVerificationPack(jobId) {
    const response = await fetch(`${API_BASE_URL}/verification/${jobId}/generate`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to generate verification pack');
    }

    return await response.json();
  },

  /**
   * Download verification JSON
   * @param {string} jobId - Job ID
   * @returns {Promise<Blob>} - JSON file blob
   */
  async downloadJSON(jobId) {
    const response = await fetch(`${API_BASE_URL}/verification/${jobId}/download/json`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to download JSON');
    }

    return await response.blob();
  },

  /**
   * Download verification PDF report
   * @param {string} jobId - Job ID
   * @returns {Promise<Blob>} - PDF file blob
   */
  async downloadPDF(jobId) {
    const response = await fetch(`${API_BASE_URL}/verification/${jobId}/download/pdf`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to download PDF');
    }

    return await response.blob();
  },

  /**
   * Verify signature
   * @param {string} jobId - Job ID
   * @param {string} signature - Signature to verify
   * @returns {Promise} - Verification result
   */
  async verifySignature(jobId, signature) {
    const response = await fetch(`${API_BASE_URL}/verification/${jobId}/verify`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ signature }),
    });

    if (!response.ok) {
      throw new Error('Signature verification failed');
    }

    return await response.json();
  },

  /**
   * Get public key for verification
   * @returns {Promise} - Public key data
   */
  async getPublicKey() {
    const response = await fetch(`${API_BASE_URL}/verification/public-key`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch public key');
    }

    return await response.json();
  },

  /**
   * Verify external verification pack
   * @param {File} file - Verification JSON file
   * @returns {Promise} - Verification result
   */
  async verifyExternalPack(file) {
    const formData = new FormData();
    formData.append('verificationPack', file);

    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}/verification/verify-external`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('External pack verification failed');
    }

    return await response.json();
  },

  /**
   * Get verification pack template
   * @returns {Promise} - Template structure
   */
  async getPackTemplate() {
    const response = await fetch(`${API_BASE_URL}/verification/template`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch template');
    }

    return await response.json();
  },

  /**
   * Share verification pack
   * @param {string} jobId - Job ID
   * @param {Object} shareData - {emails: string[], message: string, expiresIn: number}
   * @returns {Promise} - Share result with link
   */
  async shareVerificationPack(jobId, shareData) {
    const response = await fetch(`${API_BASE_URL}/verification/${jobId}/share`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(shareData),
    });

    if (!response.ok) {
      throw new Error('Failed to share verification pack');
    }

    return await response.json();
  },
};

export default verificationAPI;
