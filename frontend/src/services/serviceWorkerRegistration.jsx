// Service Worker registration
export const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/service-worker.js")

      console.log("[v0] Service Worker registered:", registration)

      // Request periodic background sync permission
      if ("periodicSync" in registration) {
        try {
          await registration.periodicSync.register("sync-locations-periodic", {
            minInterval: 60 * 60 * 1000, // 1 hour
          })
          console.log("[v0] Periodic background sync registered")
        } catch (error) {
          console.log("[v0] Periodic sync not available:", error)
        }
      }

      return registration
    } catch (error) {
      console.error("[v0] Service Worker registration failed:", error)
    }
  } else {
    console.log("[v0] Service Workers not supported")
  }
}

export const unregisterServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.ready
    await registration.unregister()
    console.log("[v0] Service Worker unregistered")
  }
}
