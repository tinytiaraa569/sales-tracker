// "use client"

// import { useState } from "react"
// import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card"
// import {Button} from "../components/ui/Button"
// import { useLocation } from "@/context/LocationContext"
// import MapView from "@/components/MapView"
// import Timeline from "@/components/Timeline"
// import StatsCards from "@/components/StatsCards"
// import TrackingControls from "@/components/TrackingControls"

// export default function Dashboard() {
//   const { locations, currentLocation } = useLocation()
//   const [activeTab, setActiveTab] = useState("map")

//   return (
//     <div className="min-h-screen bg-background p-4 md:p-8">
//       <div className="mx-auto max-w-7xl space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold">Sales Tracker Pro</h1>
//             <p className="text-muted-foreground">Track your sales team's location in real-time</p>
//           </div>
//         </div>

//         {/* Tracking Controls */}
//         <TrackingControls />

//         {/* Stats Cards */}
//         <StatsCards locations={locations} currentLocation={currentLocation} />

//         {/* Main Content */}
//         <Card>
//           <CardHeader>
//             <div className="flex items-center justify-between">
//               <CardTitle>Location Data</CardTitle>

//               <div className="flex gap-2">
//                 <Button
//                   variant={activeTab === "map" ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => setActiveTab("map")}
//                 >
//                   Map View
//                 </Button>
//                 <Button
//                   variant={activeTab === "timeline" ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => setActiveTab("timeline")}
//                 >
//                   Timeline
//                 </Button>
//               </div>
//             </div>
//           </CardHeader>

//           <CardContent>
//             {activeTab === "map" ? (
//               <MapView locations={locations} currentLocation={currentLocation} height="600px" />
//             ) : (
//               <Timeline locations={locations} />
//             )}
//           </CardContent>
//         </Card>

//         {/* Current Location Info */}
//         {currentLocation && (
//           <Card>
//             <CardHeader>
//               <CardTitle>Current Location</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid gap-4 md:grid-cols-2">
//                 <div>
//                   <p className="text-sm text-muted-foreground">City</p>
//                   <p className="text-lg font-medium">{currentLocation.address?.city || "Unknown"}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">State</p>
//                   <p className="text-lg font-medium">{currentLocation.address?.state || "Unknown"}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Country</p>
//                   <p className="text-lg font-medium">{currentLocation.address?.country || "Unknown"}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Coordinates</p>
//                   <p className="text-lg font-medium">
//                     {currentLocation.coordinates.latitude.toFixed(6)},{" "}
//                     {currentLocation.coordinates.longitude.toFixed(6)}
//                   </p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </div>
//   )
// }


"use client"

import { useState } from "react"
import { useLocation } from "../context/LocationContext"
import MapView from "../components/MapView"
import Timeline from "../components/Timeline"
import StatsCards from "../components/StatsCards"
import TrackingControls from "../components/TrackingControls"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card"
import {Button} from "../components/ui/Button"
// import { exportToCSV } from "../utils/exportToCSV"

export default function Dashboard() {
  const { locations, currentLocation, isTracking } = useLocation()
  const [activeTab, setActiveTab] = useState("map")

//   const handleExportCSV = () => {
//     exportToCSV(locations, "sales-tracker-data")
//   }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Sales Tracker Pro</h1>
            <p className="text-muted-foreground">Track your sales team's location in real-time</p>
          </div>
          {/* <Button onClick={handleExportCSV} variant="outline" disabled={locations.length === 0}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export CSV
          </Button> */}
        </div>

        {/* Tracking Controls */}
        <TrackingControls />

        {isTracking || locations.length > 0 ? (
          <>
            {/* Stats Cards */}
            <StatsCards locations={locations} currentLocation={currentLocation} />

            {/* Main Content */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Location Data</CardTitle>

                  <div className="flex gap-2">
                    <Button
                      variant={activeTab === "map" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveTab("map")}
                    >
                      Map View
                    </Button>
                    <Button
                      variant={activeTab === "timeline" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveTab("timeline")}
                    >
                      Timeline
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {activeTab === "map" ? (
                  <MapView locations={locations} currentLocation={currentLocation} height="600px" />
                ) : (
                  <Timeline locations={locations} />
                )}
              </CardContent>
            </Card>

            {/* Current Location Info */}
            {currentLocation && (
              <Card>
                <CardHeader>
                  <CardTitle>Current Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-muted-foreground">City</p>
                      <p className="text-lg font-medium">{currentLocation.address?.city || "Unknown"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">State</p>
                      <p className="text-lg font-medium">{currentLocation.address?.state || "Unknown"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Country</p>
                      <p className="text-lg font-medium">{currentLocation.address?.country || "Unknown"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Coordinates</p>
                      <p className="text-lg font-medium">
                        {currentLocation.coordinates.latitude.toFixed(6)},{" "}
                        {currentLocation.coordinates.longitude.toFixed(6)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="mb-4 rounded-full bg-primary/10 p-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Start Tracking Your Journey</h3>
              <p className="mb-6 text-center text-muted-foreground">
                Click "Start Tracking" above to begin recording your location and view your travel path on the map.
              </p>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Real-time location tracking
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Works offline with automatic sync
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Timeline view with detailed history
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
