// "use client"

// import { format, parseISO } from "date-fns"
// import { Card, CardContent } from "./ui/card"

// export default function Timeline({ locations }) {
//   // Group locations by date
//   const groupedByDate = locations.reduce((acc, location) => {
//     const date = format(new Date(location.timestamp), "yyyy-MM-dd")
//     if (!acc[date]) {
//       acc[date] = []
//     }
//     acc[date].push(location)
//     return acc
//   }, {})

//   const sortedDates = Object.keys(groupedByDate).sort((a, b) => new Date(b) - new Date(a))

//   if (locations.length === 0) {
//     return (
//       <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-border">
//         <p className="text-muted-foreground">No location data available. Start tracking to see your timeline.</p>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       {sortedDates.map((date) => (
//         <div key={date}>
//           <h3 className="mb-3 text-lg font-semibold">{format(parseISO(date), "EEEE, MMMM d, yyyy")}</h3>

//           <div className="space-y-3">
//             {groupedByDate[date].map((location, index) => (
//               <Card key={index} className="transition-colors hover:bg-accent/50">
//                 <CardContent className="p-4">
//                   <div className="flex items-start justify-between">
//                     <div className="flex-1">
//                       <div className="flex items-center gap-2">
//                         <div className="h-2 w-2 rounded-full bg-primary" />
//                         <p className="font-medium">
//                           {location.address?.city || "Unknown City"}, {location.address?.state || "Unknown State"}
//                         </p>
//                       </div>

//                       <p className="ml-4 mt-1 text-sm text-muted-foreground">
//                         {location.address?.country || "Unknown Country"}
//                       </p>

//                       {location.address?.street && (
//                         <p className="ml-4 mt-1 text-sm text-muted-foreground">{location.address.street}</p>
//                       )}

//                       <div className="ml-4 mt-2 flex items-center gap-4 text-xs text-muted-foreground">
//                         <span>Lat: {location.coordinates.latitude.toFixed(6)}</span>
//                         <span>Lon: {location.coordinates.longitude.toFixed(6)}</span>
//                         <span>Accuracy: {Math.round(location.accuracy)}m</span>
//                       </div>
//                     </div>

//                     <div className="text-right">
//                       <p className="text-sm font-medium">{format(new Date(location.timestamp), "h:mm a")}</p>
//                       <p className="text-xs text-muted-foreground">{format(new Date(location.timestamp), "MMM d")}</p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }


"use client"

import { format, parseISO } from "date-fns"
import { Card, CardContent } from "./ui/card"

export default function Timeline({ locations }) {
  // Group locations by date
  const groupedByDate = locations.reduce((acc, location) => {
    const date = format(new Date(location.timestamp), "yyyy-MM-dd")
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(location)
    return acc
  }, {})

  const sortedDates = Object.keys(groupedByDate).sort((a, b) => new Date(b) - new Date(a))

  if (locations.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-border">
        <p className="text-muted-foreground">No location data available. Start tracking to see your timeline.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {sortedDates.map((date) => (
        <div key={date}>
          <h3 className="mb-3 text-lg font-semibold">{format(parseISO(date), "EEEE, MMMM d, yyyy")}</h3>

          <div className="space-y-3">
            {groupedByDate[date].map((location, index) => (
              <Card key={index} className="transition-colors hover:bg-accent/50">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <p className="font-medium">
                          {location.address?.city || "Unknown City"}, {location.address?.state || "Unknown State"}
                        </p>
                      </div>

                      <p className="ml-4 mt-1 text-sm text-muted-foreground">
                        {location.address?.country || "Unknown Country"}
                      </p>

                      {(location.address?.street || location.address?.houseNumber) && (
                        <p className="ml-4 mt-1 text-sm text-muted-foreground">
                          {location.address?.houseNumber && `${location.address.houseNumber} `}
                          {location.address?.street}
                        </p>
                      )}

                      {location.address?.neighborhood && (
                        <p className="ml-4 mt-1 text-sm text-muted-foreground">{location.address.neighborhood}</p>
                      )}

                      {location.address?.postalCode && (
                        <p className="ml-4 mt-1 text-sm font-medium text-muted-foreground">
                          PIN: {location.address.postalCode}
                        </p>
                      )}

                      <div className="ml-4 mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Lat: {location.coordinates.latitude.toFixed(6)}</span>
                        <span>Lon: {location.coordinates.longitude.toFixed(6)}</span>
                        <span>Accuracy: {Math.round(location.accuracy)}m</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-medium">{format(new Date(location.timestamp), "h:mm a")}</p>
                      <p className="text-xs text-muted-foreground">{format(new Date(location.timestamp), "MMM d")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
