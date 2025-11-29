// API Base URL - should be set in environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * Authentication API Module
 * Handles all authentication-related API calls
 */

export const authAPI = {
  /**
   * Login user
   * @param {Object} credentials - {email, password, rememberMe}
   * @returns {Promise} - User data and auth token
   */
  async login(credentials) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();
    
    // Store auth token
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      if (credentials.rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }
    }

    return data;
  },

  /**
   * Register new user
   * @param {Object} userData - {name, email, password}
   * @returns {Promise} - User data and auth token
   */
  async register(userData) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    const data = await response.json();
    
    // Store auth token
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }

    return data;
  },

  /**
   * Logout user
   * @returns {Promise}
   */
  async logout() {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      try {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error('Logout API call failed:', error);
      }
    }

    // Clear local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('rememberMe');
  },

  /**
   * Request password reset
   * @param {Object} data - {email}
   * @returns {Promise}
   */
  async forgotPassword(data) {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Password reset request failed');
    }

    return await response.json();
  },

  /**
   * Reset password
   * @param {Object} data - {token, password}
   * @returns {Promise}
   */
  async resetPassword(data) {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Password reset failed');
    }

    return await response.json();
  },

  /**
   * Get current user profile
   * @returns {Promise} - User data
   */
  async getProfile() {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('authToken');
        throw new Error('Session expired');
      }
      throw new Error('Failed to fetch profile');
    }

    return await response.json();
  },

  /**
   * Update user profile
   * @param {Object} userData - Updated user data
   * @returns {Promise}
   */
  async updateProfile(userData) {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Profile update failed');
    }

    return await response.json();
  },

  /**
   * Verify authentication token
   * @returns {Promise<boolean>}
   */
  async verifyToken() {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      return false;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  },
};

export default authAPI;
