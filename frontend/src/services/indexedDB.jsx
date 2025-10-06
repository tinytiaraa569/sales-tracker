// IndexedDB service for offline storage
const DB_NAME = "SalesTrackerDB"
const DB_VERSION = 1

class IndexedDBService {
  constructor() {
    this.db = null
  }

  // Initialize database
  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = () => {
        console.error("[v0] IndexedDB error:", request.error)
        reject(request.error)
      }

      request.onsuccess = () => {
        this.db = request.result
        console.log("[v0] IndexedDB initialized")
        resolve(this.db)
      }

      request.onupgradeneeded = (event) => {
        const db = event.target.result

        // Create locations store
        if (!db.objectStoreNames.contains("locations")) {
          const locationStore = db.createObjectStore("locations", {
            keyPath: "id",
            autoIncrement: true,
          })
          locationStore.createIndex("timestamp", "timestamp", { unique: false })
          locationStore.createIndex("synced", "synced", { unique: false })
        }

        // Create visits store
        if (!db.objectStoreNames.contains("visits")) {
          const visitStore = db.createObjectStore("visits", {
            keyPath: "id",
            autoIncrement: true,
          })
          visitStore.createIndex("startTime", "startTime", { unique: false })
        }

        console.log("[v0] IndexedDB stores created")
      }
    })
  }

  // Save data to store
  async save(storeName, data) {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], "readwrite")
      const store = transaction.objectStore(storeName)

      const dataWithSync = {
        ...data,
        synced: false,
        savedAt: new Date().toISOString(),
      }

      const request = store.add(dataWithSync)

      request.onsuccess = () => {
        console.log("[v0] Data saved to IndexedDB:", storeName)
        resolve(request.result)
      }

      request.onerror = () => {
        console.error("[v0] IndexedDB save error:", request.error)
        reject(request.error)
      }
    })
  }

  // Get all unsynced data
  async getUnsynced(storeName) {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], "readonly")
      const store = transaction.objectStore(storeName)
      const request = store.getAll()

      request.onsuccess = () => {
        // Filter unsynced items manually to avoid key range issues
        const unsyncedItems = request.result.filter((item) => item.synced === false)
        console.log("[v0] Retrieved unsynced data:", unsyncedItems.length)
        resolve(unsyncedItems)
      }

      request.onerror = () => {
        console.error("[v0] IndexedDB get error:", request.error)
        reject(request.error)
      }
    })
  }

  // Mark data as synced
  async markAsSynced(storeName, id) {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], "readwrite")
      const store = transaction.objectStore(storeName)
      const request = store.get(id)

      request.onsuccess = () => {
        const data = request.result
        if (data) {
          data.synced = true
          const updateRequest = store.put(data)

          updateRequest.onsuccess = () => {
            console.log("[v0] Data marked as synced:", id)
            resolve()
          }

          updateRequest.onerror = () => reject(updateRequest.error)
        } else {
          resolve()
        }
      }

      request.onerror = () => reject(request.error)
    })
  }

  // Get all data from store
  async getAll(storeName) {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], "readonly")
      const store = transaction.objectStore(storeName)
      const request = store.getAll()

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }
}

const indexedDBService = new IndexedDBService()

// Helper functions
export const saveToIndexedDB = async (storeName, data) => {
  return await indexedDBService.save(storeName, data)
}

export const getUnsyncedData = async (storeName) => {
  return await indexedDBService.getUnsynced(storeName)
}

export const markAsSynced = async (storeName, id) => {
  return await indexedDBService.markAsSynced(storeName, id)
}

export const getAllData = async (storeName) => {
  return await indexedDBService.getAll(storeName)
}

export default indexedDBService
