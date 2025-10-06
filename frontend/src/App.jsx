import { Route, Routes } from "react-router-dom"
import Dashboard from "./Dashboard/Dashboard"
import { LocationProvider } from "./context/LocationContext"
import { registerServiceWorker } from "./services/serviceWorkerRegistration"
import syncService from "./services/syncService"
import indexedDBService from "./services/indexedDB"
import { useEffect } from "react"
import Home from "./Home/Home"

function App() {
    useEffect(() => {
    // Initialize IndexedDB
    indexedDBService.init().then(() => {
      console.log("[v0] App initialized with IndexedDB")
    })

    // Register service worker
    registerServiceWorker()

    // Start periodic sync
    syncService.startPeriodicSync(60000) // Sync every 1 minute

    // Listen for online/offline events
    const handleOnline = () => {
      console.log("[v0] App is online - triggering sync")
      syncService.manualSync()
    }

    const handleOffline = () => {
      console.log("[v0] App is offline")
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      syncService.stopPeriodicSync()
    }
  }, [])

  return (
    <>
    <LocationProvider>

       <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </LocationProvider>
    </>
  )
}

export default App
