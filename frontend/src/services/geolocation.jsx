// Geolocation service for tracking user location
class GeolocationService {
  constructor() {
    this.watchId = null
    this.isTracking = false
  }

  // Check if geolocation is supported
  isSupported() {
    return "geolocation" in navigator
  }

  // Request permission and get current location
  async requestPermission() {
    if (!this.isSupported()) {
      throw new Error("Geolocation is not supported by your browser")
    }

    try {
      const result = await navigator.permissions.query({ name: "geolocation" })
      return result.state
    } catch (error) {
      console.log("[v0] Permission API not supported, will request on first use")
      return "prompt"
    }
  }

  // Get current position once
  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      if (!this.isSupported()) {
        reject(new Error("Geolocation not supported"))
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: new Date(position.timestamp),
          })
        },
        (error) => {
          reject(error)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      )
    })
  }

  // Start watching position
  startTracking(onSuccess, onError) {
    if (!this.isSupported()) {
      onError(new Error("Geolocation not supported"))
      return
    }

    if (this.isTracking) {
      console.log("[v0] Already tracking location")
      return
    }

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        const locationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date(position.timestamp),
        }
        console.log("[v0] Location updated:", locationData)
        onSuccess(locationData)
      },
      (error) => {
        console.error("[v0] Location error:", error)
        onError(error)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000,
      },
    )

    this.isTracking = true
    console.log("[v0] Started tracking location")
  }

  // Stop watching position
  stopTracking() {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId)
      this.watchId = null
      this.isTracking = false
      console.log("[v0] Stopped tracking location")
    }
  }
}

export default new GeolocationService()
