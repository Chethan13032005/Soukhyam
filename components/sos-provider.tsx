"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"

interface SOSAlert {
  id: string
  timestamp: Date
  studentId: string
  message: string
  status: "active" | "acknowledged" | "resolved"
}

interface SOSContextType {
  alerts: SOSAlert[]
  triggerSOS: (studentId: string, message?: string) => void
  acknowledgeAlert: (alertId: string) => void
  resolveAlert: (alertId: string) => void
}

const SOSContext = createContext<SOSContextType | undefined>(undefined)

export function SOSProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<SOSAlert[]>([])

  const triggerSOS = (studentId: string, message = "Emergency support needed") => {
    const newAlert: SOSAlert = {
      id: Date.now().toString(),
      timestamp: new Date(),
      studentId,
      message,
      status: "active",
    }
    setAlerts((prev) => [newAlert, ...prev])
  }

  const acknowledgeAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) => (alert.id === alertId ? { ...alert, status: "acknowledged" as const } : alert)),
    )
  }

  const resolveAlert = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, status: "resolved" as const } : alert)))
  }

  return (
    <SOSContext.Provider value={{ alerts, triggerSOS, acknowledgeAlert, resolveAlert }}>{children}</SOSContext.Provider>
  )
}

export function useSOS() {
  const context = useContext(SOSContext)
  if (context === undefined) {
    throw new Error("useSOS must be used within a SOSProvider")
  }
  return context
}
