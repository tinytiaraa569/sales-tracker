// Sync service for background synchronization
import apiService from "./api"
import { getUnsyncedData, markAsSynced } from "./indexedDB"

class SyncService {
  constructor() {
    this.isSyncing = false
    this.syncInterval = null
  }

  // Start periodic sync
  startPeriodicSync(intervalMs = 60000) {
    // 1 minute
    if (this.syncInterval) {
      console.log("[v0] Periodic sync already running")
      return
    }

    console.log("[v0] Starting periodic sync every", intervalMs / 1000, "seconds")

    this.syncInterval = setInterval(() => {
      if (navigator.onLine) {
        this.syncData()
      }
    }, intervalMs)

    // Also sync immediately if online
    if (navigator.onLine) {
      this.syncData()
    }
  }

  // Stop periodic sync
  stopPeriodicSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval)
      this.syncInterval = null
      console.log("[v0] Stopped periodic sync")
    }
  }

  // Sync unsynced data to backend
  async syncData() {
    if (this.isSyncing) {
      console.log("[v0] Sync already in progress")
      return
    }

    if (!navigator.onLine) {
      console.log("[v0] Cannot sync - offline")
      return
    }

    this.isSyncing = true
    console.log("[v0] Starting data sync...")

    try {
      // Get unsynced locations
      const unsyncedLocations = await getUnsyncedData("locations")

      if (unsyncedLocations.length > 0) {
        console.log("[v0] Syncing", unsyncedLocations.length, "locations")

        // Prepare data for bulk upload
        const locationsToSync = unsyncedLocations.map((loc) => ({
          userId: loc.userId,
          coordinates: loc.coordinates,
          address: loc.address,
          accuracy: loc.accuracy,
          timestamp: loc.timestamp,
          isOnline: false, // Mark as synced from offline
        }))

        // Bulk upload to backend
        await apiService.bulkSaveLocations(locationsToSync)

        // Mark all as synced
        for (const location of unsyncedLocations) {
          await markAsSynced("locations", location.id)
        }

        console.log("[v0] Successfully synced", unsyncedLocations.length, "locations")
      } else {
        console.log("[v0] No data to sync")
      }
    } catch (error) {
      console.error("[v0] Sync error:", error)
    } finally {
      this.isSyncing = false
    }
  }

  // Manual sync trigger
  async manualSync() {
    console.log("[v0] Manual sync triggered")
    await this.syncData()
  }
}

export default new SyncService()
