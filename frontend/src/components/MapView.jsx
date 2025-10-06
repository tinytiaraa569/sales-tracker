// "use client"

// import { useEffect, useRef } from "react"
// import L from "leaflet"
// import "leaflet/dist/leaflet.css"

// // Fix for default marker icons in Leaflet
// delete L.Icon.Default.prototype._getIconUrl
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
//   iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
//   shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
// })

// export default function MapView({ locations, currentLocation, height = "500px" }) {
//   const mapRef = useRef(null)
//   const mapInstanceRef = useRef(null)
//   const markersRef = useRef([])
//   const polylineRef = useRef(null) // Added polyline ref to track the path

//   useEffect(() => {
//     if (!mapRef.current || mapInstanceRef.current) return

//     // Initialize map
//     const map = L.map(mapRef.current).setView([20.5937, 78.9629], 5) // India center

//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       maxZoom: 19,
//     }).addTo(map)

//     mapInstanceRef.current = map

//     return () => {
//       if (mapInstanceRef.current) {
//         mapInstanceRef.current.remove()
//         mapInstanceRef.current = null
//       }
//     }
//   }, [])

//   useEffect(() => {
//     if (!mapInstanceRef.current) return

//     // Clear existing markers and polyline
//     markersRef.current.forEach((marker) => marker.remove())
//     markersRef.current = []

//     if (polylineRef.current) {
//       polylineRef.current.remove()
//       polylineRef.current = null
//     }

//     // Add markers for all locations
//     if (locations && locations.length > 0) {
//       const sortedLocations = [...locations].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))

//       const pathCoordinates = sortedLocations.map((loc) => [loc.coordinates.latitude, loc.coordinates.longitude])

//       if (pathCoordinates.length > 1) {
//         polylineRef.current = L.polyline(pathCoordinates, {
//           color: "#3b82f6",
//           weight: 3,
//           opacity: 0.7,
//           smoothFactor: 1,
//         }).addTo(mapInstanceRef.current)
//       }

//       sortedLocations.forEach((location, index) => {
//         const markerIcon = L.divIcon({
//           className: "custom-numbered-marker",
//           html: `<div style="
//             background-color: #1e293b;
//             color: white;
//             width: 28px;
//             height: 28px;
//             border-radius: 50%;
//             border: 2px solid #3b82f6;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-weight: bold;
//             font-size: 12px;
//             box-shadow: 0 2px 8px rgba(0,0,0,0.3);
//           ">${index + 1}</div>`,
//           iconSize: [28, 28],
//           iconAnchor: [14, 14],
//         })

//         const marker = L.marker([location.coordinates.latitude, location.coordinates.longitude], {
//           icon: markerIcon,
//         })
//           .addTo(mapInstanceRef.current)
//           .bindPopup(
//             `
//             <div style="color: #000; min-width: 200px;">
//               <strong style="color: #3b82f6;">Stop #${index + 1}</strong><br/>
//               <strong>${location.address?.city || "Unknown"}</strong><br/>
//               ${location.address?.state || ""}, ${location.address?.country || ""}<br/>
//               <small>${new Date(location.timestamp).toLocaleString()}</small><br/>
//               <small style="color: #666;">Accuracy: ${Math.round(location.accuracy)}m</small>
//             </div>
//           `,
//           )

//         markersRef.current.push(marker)
//       })

//       // Fit map to show all markers
//       const bounds = L.latLngBounds(sortedLocations.map((loc) => [loc.coordinates.latitude, loc.coordinates.longitude]))
//       mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] })
//     }

//     // Add current location marker with different color
//     if (currentLocation) {
//       const currentIcon = L.divIcon({
//         className: "custom-current-marker",
//         html: `<div style="
//           background-color: #10b981;
//           width: 24px;
//           height: 24px;
//           border-radius: 50%;
//           border: 3px solid white;
//           box-shadow: 0 0 15px rgba(16, 185, 129, 0.6);
//           animation: pulse 2s infinite;
//         "></div>
//         <style>
//           @keyframes pulse {
//             0%, 100% { transform: scale(1); opacity: 1; }
//             50% { transform: scale(1.1); opacity: 0.8; }
//           }
//         </style>`,
//         iconSize: [24, 24],
//         iconAnchor: [12, 12],
//       })

//       const currentMarker = L.marker([currentLocation.coordinates.latitude, currentLocation.coordinates.longitude], {
//         icon: currentIcon,
//       })
//         .addTo(mapInstanceRef.current)
//         .bindPopup(
//           `
//           <div style="color: #000;">
//             <strong style="color: #10b981;">📍 Current Location</strong><br/>
//             ${currentLocation.address?.city || "Unknown"}<br/>
//             ${currentLocation.address?.state || ""}, ${currentLocation.address?.country || ""}<br/>
//             <small>Accuracy: ${Math.round(currentLocation.accuracy)}m</small>
//           </div>
//         `,
//         )

//       markersRef.current.push(currentMarker)
//     }
//   }, [locations, currentLocation])

//   return <div ref={mapRef} style={{ height, width: "100%", borderRadius: "0.5rem" }} />
// }
"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-arrowheads" // Added import for arrowheads plugin

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
})

export default function MapView({ locations, currentLocation, height = "500px" }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])
  const polylineRef = useRef(null) // Added polyline ref to track the path

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Initialize map
    const map = L.map(mapRef.current).setView([20.5937, 78.9629], 5) // India center

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map)

    mapInstanceRef.current = map

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!mapInstanceRef.current) return

    // Clear existing markers and polyline
    markersRef.current.forEach((marker) => marker.remove())
    markersRef.current = []

    if (polylineRef.current) {
      polylineRef.current.remove()
      polylineRef.current = null
    }

    // Add markers for all locations
    if (locations && locations.length > 0) {
      const sortedLocations = [...locations].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))

      const pathCoordinates = sortedLocations.map((loc) => [loc.coordinates.latitude, loc.coordinates.longitude])

      if (pathCoordinates.length > 1) {
        polylineRef.current = L.polyline(pathCoordinates, {
          color: "#3b82f6",
          weight: 4,
          opacity: 0.8,
          smoothFactor: 1,
        }).addTo(mapInstanceRef.current)
        polylineRef.current.arrowheads({
          frequency: 50,
          offset: 0,
          symbols: [{ pixelSize: 10, polygon: true, pathOptions: { color: "#3b82f6" } }],
        })
      }

      sortedLocations.forEach((location, index) => {
        const markerIcon = L.divIcon({
          className: "custom-numbered-marker",
          html: `<div style="
            background-color: #1e293b;
            color: white;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 3px solid #3b82f6;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 13px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.4);
          ">${index + 1}</div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        })

        const marker = L.marker([location.coordinates.latitude, location.coordinates.longitude], {
          icon: markerIcon,
        })
          .addTo(mapInstanceRef.current)
          .bindPopup(
            `
            <div style="color: #000; min-width: 220px;">
              <strong style="color: #3b82f6; font-size: 14px;">📍 Stop #${index + 1}</strong><br/>
              <strong style="font-size: 13px;">${location.address?.city || "Unknown"}</strong><br/>
              ${location.address?.state || ""}, ${location.address?.country || ""}<br/>
              ${location.address?.street ? `<small>${location.address.houseNumber || ""} ${location.address.street}</small><br/>` : ""}
              ${location.address?.postalCode ? `<small><strong>PIN:</strong> ${location.address.postalCode}</small><br/>` : ""}
              <small style="color: #666;">${new Date(location.timestamp).toLocaleString()}</small><br/>
              <small style="color: #666;">Accuracy: ${Math.round(location.accuracy)}m</small>
            </div>
          `,
          )

        markersRef.current.push(marker)
      })

      // Fit map to show all markers
      const bounds = L.latLngBounds(sortedLocations.map((loc) => [loc.coordinates.latitude, loc.coordinates.longitude]))
      mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] })
    }

    // Add current location marker with different color
    if (currentLocation) {
      const currentIcon = L.divIcon({
        className: "custom-current-marker",
        html: `<div style="
          background-color: #10b981;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.6);
          animation: pulse 2s infinite;
        "></div>
        <style>
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.8; }
          }
        </style>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })

      const currentMarker = L.marker([currentLocation.coordinates.latitude, currentLocation.coordinates.longitude], {
        icon: currentIcon,
      })
        .addTo(mapInstanceRef.current)
        .bindPopup(
          `
          <div style="color: #000;">
            <strong style="color: #10b981;">📍 Current Location</strong><br/>
            ${currentLocation.address?.city || "Unknown"}<br/>
            ${currentLocation.address?.state || ""}, ${currentLocation.address?.country || ""}<br/>
            <small>Accuracy: ${Math.round(currentLocation.accuracy)}m</small>
          </div>
        `,
        )

      markersRef.current.push(currentMarker)
    }
  }, [locations, currentLocation])

  return <div ref={mapRef} style={{ height, width: "100%", borderRadius: "0.5rem" }} />
}
