"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import {Button} from "./ui/button"

export default function PermissionDialog({ onAllow, onDeny }) {
  const [isVisible, setIsVisible] = useState(true)

  const handleAllow = () => {
    setIsVisible(false)
    onAllow()
  }

  const handleDeny = () => {
    setIsVisible(false)
    onDeny()
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Location Permission Required</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            Sales Tracker Pro needs access to your location to track your visits and provide accurate analytics.
          </p>

          <div className="space-y-3 rounded-lg bg-muted p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                1
              </div>
              <div>
                <p className="font-medium">Background Tracking</p>
                <p className="text-sm text-muted-foreground">Track your location even when the app is in background</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                2
              </div>
              <div>
                <p className="font-medium">Offline Support</p>
                <p className="text-sm text-muted-foreground">
                  Works without internet and syncs when connection is restored
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                3
              </div>
              <div>
                <p className="font-medium">Timeline & Analytics</p>
                <p className="text-sm text-muted-foreground">View where you've been with date and time details</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={handleDeny}>
              Deny
            </Button>
            <Button className="flex-1" onClick={handleAllow}>
              Allow Location Access
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Your location data is stored securely and only used for tracking purposes.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
