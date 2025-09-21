"use client"

import type React from "react"
import { createContext, useContext, useEffect } from "react"
import { useRealtime, type RealtimeEvent } from "@/hooks/use-realtime"
import { useToast } from "@/hooks/use-toast"
import { useSOS } from "@/components/sos-provider"

interface RealtimeContextType {
  isConnected: boolean
  events: RealtimeEvent[]
  sendEvent: (event: Omit<RealtimeEvent, "timestamp">) => Promise<void>
}

const RealtimeContext = createContext<RealtimeContextType | undefined>(undefined)

export function RealtimeProvider({ children }: { children: React.ReactNode }) {
  const { isConnected, events, sendEvent } = useRealtime()
  const { toast } = useToast()
  const { triggerSOS } = useSOS()

  useEffect(() => {
    // Handle realtime events
    const latestEvent = events[events.length - 1]
    if (!latestEvent) return

    switch (latestEvent.type) {
      case "sos_alert":
        toast({
          title: "🚨 SOS Alert Detected",
          description: "Emergency protocols have been activated. Help is on the way.",
          variant: "destructive",
        })
        break

      case "wellness_update":
        toast({
          title: "🌱 Wellness Update",
          description: latestEvent.data.message || "Your wellness tree has been updated!",
        })
        break

      case "activity_started":
        toast({
          title: "🎯 Activity Started",
          description: `Started ${latestEvent.data.title}`,
        })
        break

      case "connection":
        if (latestEvent.data.message?.includes("Connected")) {
          toast({
            title: "🔗 Connected",
            description: "Real-time updates are now active",
          })
        }
        break

      case "system_notification":
        if (latestEvent.data.message !== "heartbeat" && latestEvent.data.message !== "ping") {
          console.log("[v0] System notification:", latestEvent.data.message)
        }
        break
    }
  }, [events, toast, triggerSOS])

  return <RealtimeContext.Provider value={{ isConnected, events, sendEvent }}>{children}</RealtimeContext.Provider>
}

export function useRealtimeContext() {
  const context = useContext(RealtimeContext)
  if (context === undefined) {
    throw new Error("useRealtimeContext must be used within a RealtimeProvider")
  }
  return context
}
