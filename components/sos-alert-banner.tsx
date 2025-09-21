"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Siren, Eye, CheckCircle } from "lucide-react"
import { useSOS } from "./sos-provider"

interface SOSAlertBannerProps {
  userRole: "counselor" | "admin"
}

export function SOSAlertBanner({ userRole }: SOSAlertBannerProps) {
  const { alerts, acknowledgeAlert, resolveAlert } = useSOS()

  const activeAlerts = alerts.filter((alert) => alert.status === "active")

  if (activeAlerts.length === 0) return null

  return (
    <div className="space-y-2">
      {activeAlerts.map((alert) => (
        <Alert key={alert.id} className="border-destructive bg-destructive/10">
          <Siren className="h-4 w-4 text-destructive animate-pulse" />
          <AlertDescription className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <span className="font-semibold text-destructive">CRISIS ALERT:</span>
                <span className="ml-2">
                  An escalation alert has been received. A student requires immediate attention.
                </span>
                <div className="text-sm text-muted-foreground mt-1">
                  Student ID: {alert.studentId} • {alert.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => acknowledgeAlert(alert.id)}
                className="border-destructive text-destructive hover:bg-destructive/10"
              >
                <Eye className="w-4 h-4 mr-1" />
                View Details
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => resolveAlert(alert.id)}
                className="border-destructive text-destructive hover:bg-destructive/10"
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Mark Resolved
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      ))}
    </div>
  )
}
