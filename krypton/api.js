// API configuration and utilities
class ApiClient {
  constructor() {
    this.baseURL = "http://localhost:8080/api"
    this.token = localStorage.getItem("auth_token")
  }

  setToken(token) {
    this.token = token
    if (token) {
      localStorage.setItem("auth_token", token)
    } else {
      localStorage.removeItem("auth_token")
    }
  }

  getAuthHeaders() {
    const headers = {
      "Content-Type": "application/json",
    }

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`
    }

    return headers
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: this.getAuthHeaders(),
      ...options,
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const contentType = response.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
        return await response.json()
      }

      return await response.text()
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }

  // Authentication endpoints
  async register(userData) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  async login(credentials) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })
  }

  async logout() {
    try {
      await this.request("/auth/logout", {
        method: "POST",
      })
    } finally {
      this.setToken(null)
    }
  }

  async refreshToken() {
    return this.request("/auth/refresh", {
      method: "POST",
    })
  }

  // Children endpoints
  async getChildren() {
    return this.request("/children")
  }

  async getChild(id) {
    return this.request(`/children/${id}`)
  }

  async addChild(childData) {
    return this.request("/children", {
      method: "POST",
      body: JSON.stringify(childData),
    })
  }

  async updateChild(id, childData) {
    return this.request(`/children/${id}`, {
      method: "PUT",
      body: JSON.stringify(childData),
    })
  }

  async deleteChild(id) {
    return this.request(`/children/${id}`, {
      method: "DELETE",
    })
  }

  async uploadChildPhoto(id, photoFile) {
    const formData = new FormData()
    formData.append("photo", photoFile)

    return this.request(`/children/${id}/photo`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: formData,
    })
  }

  // Vaccine endpoints
  async getVaccines() {
    return this.request("/vaccines")
  }

  async getVaccine(id) {
    return this.request(`/vaccines/${id}`)
  }

  async getMandatoryVaccines() {
    return this.request("/vaccines/mandatory")
  }

  async getVaccinesByAge(ageInMonths) {
    return this.request(`/vaccines/by-age/${ageInMonths}`)
  }
}

// Create global API client instance
window.apiClient = new ApiClient()
