"use client"

import { useState } from "react"
import {Button} from "./ui/Button"
import { useLocationTracking } from "../hooks/useLocationTracking"
import { useLocation } from "@/context/LocationContext"
import PermissionDialog from "./PermissionDialog"


// export default function TrackingControls() {
//   const { isTracking, startTracking, stopTracking, error } = useLocationTracking()
//   const { isOnline, permissionStatus } = useLocation()
//   const [showPermissionDialog, setShowPermissionDialog] = useState(false)

//   const handleStartTracking = () => {
//     if (permissionStatus === "prompt" || permissionStatus === "denied") {
//       setShowPermissionDialog(true)
//     } else {
//       startTracking()
//     }
//   }

//   const handlePermissionAllow = () => {
//     startTracking()
//   }

//   const handlePermissionDeny = () => {
//     console.log("[v0] User denied location permission")
//   }

//   return (
//     <>
//       {showPermissionDialog && <PermissionDialog onAllow={handlePermissionAllow} onDeny={handlePermissionDeny} />}

//       <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
//         <div className="flex items-center gap-4">
//           <div className="flex items-center gap-2">
//             <div className={`h-3 w-3 rounded-full ${isTracking ? "bg-green-500 animate-pulse" : "bg-gray-500"}`} />
//             <span className="text-sm font-medium">{isTracking ? "Tracking Active" : "Tracking Inactive"}</span>
//           </div>

//           <div className="h-4 w-px bg-border" />

//           <div className="flex items-center gap-2">
//             <div className={`h-3 w-3 rounded-full ${isOnline ? "bg-blue-500" : "bg-orange-500"}`} />
//             <span className="text-sm font-medium">{isOnline ? "Online" : "Offline"}</span>
//           </div>
//         </div>

//         <div className="flex items-center gap-2">
//           {error && <span className="text-sm text-destructive">{error}</span>}

//           {isTracking ? (
//             <Button variant="destructive" onClick={stopTracking}>
//               Stop Tracking
//             </Button>
//           ) : (
//             <Button onClick={handleStartTracking}>Start Tracking</Button>
//           )}
//         </div>
//       </div>
//     </>
//   )
// }


export default function TrackingControls() {
  const { isTracking, startTracking, stopTracking, error, trackingInterval, setTrackingInterval } =
    useLocationTracking()
  const { isOnline, permissionStatus } = useLocation()
  const [showPermissionDialog, setShowPermissionDialog] = useState(false)

  const handleStartTracking = () => {
    if (permissionStatus === "prompt" || permissionStatus === "denied") {
      setShowPermissionDialog(true)
    } else {
      startTracking()
    }
  }

  const handlePermissionAllow = () => {
    startTracking()
  }

  const handlePermissionDeny = () => {
    console.log("[v0] User denied location permission")
  }

  return (
    <>
      {showPermissionDialog && <PermissionDialog onAllow={handlePermissionAllow} onDeny={handlePermissionDeny} />}

      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Tracking Interval:</span>
            <select
              value={trackingInterval}
              onChange={(e) => setTrackingInterval(Number(e.target.value))}
              disabled={isTracking}
              className="rounded-md border border-border bg-background px-3 py-1 text-sm disabled:opacity-50"
            >
              <option value={1}>1 minute</option>
              <option value={5}>5 minutes</option>
              <option value={10}>10 minutes</option>
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
            </select>
            <span className="text-xs text-muted-foreground">(Change before starting)</span>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`h-3 w-3 rounded-full ${isTracking ? "bg-green-500 animate-pulse" : "bg-gray-500"}`} />
              <span className="text-sm font-medium">{isTracking ? "Tracking Active" : "Tracking Inactive"}</span>
            </div>

            <div className="h-4 w-px bg-border" />

            <div className="flex items-center gap-2">
              <div className={`h-3 w-3 rounded-full ${isOnline ? "bg-blue-500" : "bg-orange-500"}`} />
              <span className="text-sm font-medium">{isOnline ? "Online" : "Offline"}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {error && <span className="text-sm text-destructive">{error}</span>}

            {isTracking ? (
              <Button variant="destructive" onClick={stopTracking}>
                Stop Tracking
              </Button>
            ) : (
              <Button onClick={handleStartTracking}>Start Tracking</Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
