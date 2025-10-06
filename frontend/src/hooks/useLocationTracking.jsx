"use client"

import { useState, useCallback, useRef } from "react"
import geolocationService from "../services/geolocation"
import geocodingService from "../services/geocoding"
import apiService from "../services/api"
import { saveToIndexedDB } from "../services/indexedDB"
import { useLocation } from "@/context/LocationContext"

// export const useLocationTracking = () => {
//   const { isTracking, setIsTracking, setCurrentLocation, locations, setLocations, setPermissionStatus, isOnline } =
//     useLocation()

//   const [error, setError] = useState(null)

//   // Request location permission
//   const requestPermission = useCallback(async () => {
//     try {
//       const status = await geolocationService.requestPermission()
//       setPermissionStatus(status)
//       return status
//     } catch (err) {
//       setError(err.message)
//       return "denied"
//     }
//   }, [setPermissionStatus])

//   // Start tracking
//   const startTracking = useCallback(async () => {
//     try {
//       const permission = await requestPermission()

//       if (permission === "denied") {
//         setError("Location permission denied")
//         return
//       }

//       geolocationService.startTracking(
//         async (position) => {
//           console.log("[v0] New position received:", position)

//           // Get address from coordinates
//           const address = await geocodingService.reverseGeocode(position.latitude, position.longitude)

//           const locationData = {
//             userId: "demo-user-123", // Replace with actual user ID
//             coordinates: {
//               latitude: position.latitude,
//               longitude: position.longitude,
//             },
//             address,
//             accuracy: position.accuracy,
//             timestamp: position.timestamp,
//             isOnline,
//           }

//           setCurrentLocation(locationData)
//           setLocations((prev) => [locationData, ...prev])

//           // Save to backend if online, otherwise save to IndexedDB
//           if (isOnline) {
//             try {
//               await apiService.saveLocation(locationData)
//               console.log("[v0] Location saved to backend")
//             } catch (err) {
//               console.log("[v0] Failed to save online, saving offline")
//               await saveToIndexedDB("locations", locationData)
//             }
//           } else {
//             await saveToIndexedDB("locations", locationData)
//             console.log("[v0] Location saved offline")
//           }
//         },
//         (err) => {
//           console.error("[v0] Tracking error:", err)
//           setError(err.message)
//         },
//       )

//       setIsTracking(true)
//       setError(null)
//     } catch (err) {
//       setError(err.message)
//     }
//   }, [requestPermission, setCurrentLocation, setLocations, setIsTracking, isOnline])

//   // Stop tracking
//   const stopTracking = useCallback(() => {
//     geolocationService.stopTracking()
//     setIsTracking(false)
//   }, [setIsTracking])

//   return {
//     isTracking,
//     startTracking,
//     stopTracking,
//     requestPermission,
//     error,
//   }
// }

// "use client"

// import { useState, useCallback, useRef } from "react"
// import { useLocation } from "../context/LocationContext"
// import geolocationService from "../services/geolocation"
// import geocodingService from "../services/geocoding"
// import apiService from "../services/api"
// import { saveToIndexedDB } from "../services/indexedDB"

export const useLocationTracking = () => {
  const { isTracking, setIsTracking, setCurrentLocation, locations, setLocations, setPermissionStatus, isOnline } =
    useLocation()

  const [error, setError] = useState(null)
  const [trackingInterval, setTrackingInterval] = useState(1)
  const intervalIdRef = useRef(null)

  // Request location permission
  const requestPermission = useCallback(async () => {
    try {
      const status = await geolocationService.requestPermission()
      setPermissionStatus(status)
      return status
    } catch (err) {
      setError(err.message)
      return "denied"
    }
  }, [setPermissionStatus])

  const captureLocation = useCallback(async () => {
    try {
      const position = await geolocationService.getCurrentPosition()

      // Get address from coordinates
      const address = await geocodingService.reverseGeocode(position.latitude, position.longitude)

      const locationData = {
        userId: "demo-user-123",
        coordinates: {
          latitude: position.latitude,
          longitude: position.longitude,
        },
        address,
        accuracy: position.accuracy,
        timestamp: position.timestamp,
        isOnline,
      }

      setCurrentLocation(locationData)
      setLocations((prev) => [locationData, ...prev])

      // Save to backend if online, otherwise save to IndexedDB
      if (isOnline) {
        try {
          await apiService.saveLocation(locationData)
        } catch (err) {
          await saveToIndexedDB("locations", locationData)
        }
      } else {
        await saveToIndexedDB("locations", locationData)
      }
    } catch (err) {
      console.error("Error capturing location:", err)
    }
  }, [setCurrentLocation, setLocations, isOnline])

  // Start tracking
  const startTracking = useCallback(async () => {
    try {
      const permission = await requestPermission()

      if (permission === "denied") {
        setError("Location permission denied")
        return
      }

      await captureLocation()

      intervalIdRef.current = setInterval(
        () => {
          captureLocation()
        },
        trackingInterval * 60 * 1000,
      ) // Convert minutes to milliseconds

      setIsTracking(true)
      setError(null)
    } catch (err) {
      setError(err.message)
    }
  }, [requestPermission, captureLocation, trackingInterval, setIsTracking])

  // Stop tracking
  const stopTracking = useCallback(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current)
      intervalIdRef.current = null
    }
    geolocationService.stopTracking()
    setIsTracking(false)
  }, [setIsTracking])

  return {
    isTracking,
    startTracking,
    stopTracking,
    requestPermission,
    error,
    trackingInterval,
    setTrackingInterval,
  }
}

