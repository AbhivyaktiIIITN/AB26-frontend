const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const apiClient = {
  // generic request helper: always sends cookies (credentials: 'include').

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };

    const response = await fetch(url, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const err = new Error(data.error || "Something went wrong");
      err.status = response.status;
      err.data = data;
      throw err;
    }

    return data;
  },

  // ─── Auth ──────────────────────────────────────────────

  async register(userData) {
    return this.request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  async login(credentials) {
    return this.request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  async logout() {
    return this.request("/api/auth/logout", {
      method: "POST",
    });
  },

  /**
   * Redirects browser to the Google OAuth consent screen.
   * (Not a fetch call – use window.location.href)
   */
  getGoogleOAuthURL() {
    return `${API_BASE_URL}/api/auth/google`;
  },

  // ─── OTP / Email Verification ──────────────────────────

  async verifyEmail(otp) {
    return this.request("/api/otp/verify", {
      method: "POST",
      body: JSON.stringify({ otp }),
    });
  },

  // ─── User ─────────────────────────────────────────────

  async getUserProfile() {
    return this.request("/api/users/profile");
  },

  async updateUserProfile(data) {
    return this.request("/api/users/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
};

export default apiClient;
