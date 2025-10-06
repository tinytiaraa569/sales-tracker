// // Free reverse geocoding using OpenStreetMap Nominatim API
// class GeocodingService {
//   constructor() {
//     this.baseUrl = "https://nominatim.openstreetmap.org"
//   }

//   // Reverse geocode coordinates to address
//   async reverseGeocode(latitude, longitude) {
//     try {
//       const response = await fetch(
//         `${this.baseUrl}/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
//         {
//           headers: {
//             "User-Agent": "SalesTrackerApp/1.0",
//           },
//         },
//       )

//       if (!response.ok) {
//         throw new Error("Geocoding failed")
//       }

//       const data = await response.json()

//       return {
//         country: data.address?.country || "Unknown",
//         state: data.address?.state || data.address?.province || "Unknown",
//         city: data.address?.city || data.address?.town || data.address?.village || "Unknown",
//         street: data.address?.road || "",
//         postalCode: data.address?.postcode || "",
//         displayName: data.display_name,
//       }
//     } catch (error) {
//       console.error("[v0] Geocoding error:", error)
//       return {
//         country: "Unknown",
//         state: "Unknown",
//         city: "Unknown",
//         street: "",
//         postalCode: "",
//         displayName: "Location unavailable",
//       }
//     }
//   }
// }

// export default new GeocodingService()



// Free reverse geocoding using OpenStreetMap Nominatim API
class GeocodingService {
  constructor() {
    this.nominatimUrl = "https://nominatim.openstreetmap.org"
  }

  async reverseGeocode(latitude, longitude) {
    try {
      const response = await fetch(
        `${this.nominatimUrl}/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=20&addressdetails=1`,
        {
          headers: {
            "User-Agent": "SalesTrackerApp/1.0",
            Accept: "application/json",
          },
        },
      )

      if (!response.ok) {
        throw new Error("Geocoding API failed")
      }

      const data = await response.json()

      return {
        country: data.address?.country || "Unknown",
        state: data.address?.state || data.address?.province || "Unknown",
        city: data.address?.city || data.address?.town || data.address?.village || "Unknown",
        street: data.address?.road || data.address?.street || "",
        postalCode: data.address?.postcode || data.address?.postal_code || "",
        neighborhood: data.address?.neighbourhood || data.address?.suburb || "",
        houseNumber: data.address?.house_number || "",
        displayName: data.display_name,
      }
    } catch (error) {
      console.error("Geocoding error:", error)
      return this.getDefaultAddress()
    }
  }

  getDefaultAddress() {
    return {
      country: "Unknown",
      state: "Unknown",
      city: "Unknown",
      street: "",
      postalCode: "",
      neighborhood: "",
      houseNumber: "",
      displayName: "Location unavailable",
    }
  }
}

export default new GeocodingService()
