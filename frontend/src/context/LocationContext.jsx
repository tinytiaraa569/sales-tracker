"use client"

import { createContext, useContext, useState, useEffect } from "react"

const LocationContext = createContext()

export const useLocation = () => {
  const context = useContext(LocationContext)
  if (!context) {
    throw new Error("useLocation must be used within LocationProvider")
  }
  return context
}

export const LocationProvider = ({ children }) => {
  const [isTracking, setIsTracking] = useState(false)
  const [currentLocation, setCurrentLocation] = useState(null)
  const [locations, setLocations] = useState([])
  const [permissionStatus, setPermissionStatus] = useState("prompt")
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const value = {
    isTracking,
    setIsTracking,
    currentLocation,
    setCurrentLocation,
    locations,
    setLocations,
    permissionStatus,
    setPermissionStatus,
    isOnline,
  }

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>
}
