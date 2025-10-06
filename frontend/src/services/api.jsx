// API service for backend communication
const API_BASE_URL = "http://localhost:8000/api"

class ApiService {
  // Save location to backend
  async saveLocation(locationData) {
    try {
      const response = await fetch(`${API_BASE_URL}/locations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(locationData),
      })

      if (!response.ok) {
        throw new Error("Failed to save location")
      }

      return await response.json()
    } catch (error) {
      console.error("[v0] API Error:", error)
      throw error
    }
  }

  // Bulk save locations (for offline sync)
  async bulkSaveLocations(locations) {
    try {
      const response = await fetch(`${API_BASE_URL}/locations/bulk`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ locations }),
      })

      if (!response.ok) {
        throw new Error("Failed to bulk save locations")
      }

      return await response.json()
    } catch (error) {
      console.error("[v0] Bulk save error:", error)
      throw error
    }
  }

  // Get locations by user
  async getLocations(userId, params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString()
      const response = await fetch(`${API_BASE_URL}/locations/user/${userId}?${queryString}`)

      if (!response.ok) {
        throw new Error("Failed to fetch locations")
      }

      return await response.json()
    } catch (error) {
      console.error("[v0] Fetch locations error:", error)
      throw error
    }
  }

  // Get location timeline
  async getTimeline(userId, date) {
    try {
      const response = await fetch(`${API_BASE_URL}/locations/timeline/${userId}?date=${date}`)

      if (!response.ok) {
        throw new Error("Failed to fetch timeline")
      }

      return await response.json()
    } catch (error) {
      console.error("[v0] Fetch timeline error:", error)
      throw error
    }
  }
}

export default new ApiService()
