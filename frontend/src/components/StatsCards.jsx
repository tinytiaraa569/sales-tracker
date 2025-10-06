"use client"

import { Card, CardContent } from "./ui/card"

export default function StatsCards({ locations, currentLocation }) {
  const totalLocations = locations.length

  // Calculate unique cities
  const uniqueCities = new Set(locations.map((loc) => loc.address?.city).filter(Boolean)).size

  // Calculate unique states
  const uniqueStates = new Set(locations.map((loc) => loc.address?.state).filter(Boolean)).size

  // Calculate distance traveled (simplified)
  const calculateDistance = () => {
    if (locations.length < 2) return 0

    let totalDistance = 0
    for (let i = 1; i < locations.length; i++) {
      const prev = locations[i - 1]
      const curr = locations[i]

      const R = 6371 // Earth's radius in km
      const dLat = ((curr.coordinates.latitude - prev.coordinates.latitude) * Math.PI) / 180
      const dLon = ((curr.coordinates.longitude - prev.coordinates.longitude) * Math.PI) / 180

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((prev.coordinates.latitude * Math.PI) / 180) *
          Math.cos((curr.coordinates.latitude * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2)

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      totalDistance += R * c
    }

    return totalDistance.toFixed(2)
  }

  const stats = [
    {
      label: "Total Locations",
      value: totalLocations,
      icon: "📍",
    },
    {
      label: "Cities Visited",
      value: uniqueCities,
      icon: "🏙️",
    },
    {
      label: "States Covered",
      value: uniqueStates,
      icon: "🗺️",
    },
    {
      label: "Distance Traveled",
      value: `${calculateDistance()} km`,
      icon: "🚗",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="mt-2 text-2xl font-bold">{stat.value}</p>
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
