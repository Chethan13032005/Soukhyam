"use client"

import { useEffect, useRef, useState, useCallback } from "react"

export interface RealtimeEvent {
  type:
    | "sos_alert"
    | "wellness_update"
    | "chat_message"
    | "system_notification"
    | "connection"
    | "heartbeat"
    | "activity_started"
  data: any
  timestamp: number
  userId?: string
}

export function useRealtime() {
  const [isConnected, setIsConnected] = useState(false)
  const [events, setEvents] = useState<RealtimeEvent[]>([])
  const eventSourceRef = useRef<EventSource | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>()
  const reconnectAttemptsRef = useRef(0)
  const maxReconnectAttempts = 5

  const connect = useCallback(() => {
    if (eventSourceRef.current?.readyState === EventSource.OPEN) {
      return
    }

    if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
      console.log("[v0] Max reconnection attempts reached, stopping")
      return
    }

    try {
      const eventSource = new EventSource("/api/realtime")
      eventSourceRef.current = eventSource

      eventSource.onopen = () => {
        console.log("[v0] Realtime connection established")
        setIsConnected(true)
        reconnectAttemptsRef.current = 0 // Reset attempts on successful connection
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current)
        }
      }

      eventSource.onmessage = (event) => {
        try {
          const realtimeEvent: RealtimeEvent = JSON.parse(event.data)
          if (realtimeEvent.type !== "heartbeat") {
            setEvents((prev) => [...prev.slice(-49), realtimeEvent]) // Keep last 50 events
          }
        } catch (error) {
          console.error("[v0] Failed to parse realtime event:", error)
        }
      }

      eventSource.onerror = (error) => {
        console.log("[v0] Realtime connection error, attempting reconnect...")
        setIsConnected(false)
        eventSource.close()

        reconnectAttemptsRef.current += 1

        const backoffDelay = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 30000)

        if (reconnectAttemptsRef.current < maxReconnectAttempts) {
          reconnectTimeoutRef.current = setTimeout(() => {
            connect()
          }, backoffDelay)
        }
      }
    } catch (error) {
      console.error("[v0] Failed to establish realtime connection:", error)
      setIsConnected(false)
    }
  }, [])

  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close()
      eventSourceRef.current = null
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
    }
    setIsConnected(false)
    reconnectAttemptsRef.current = 0
  }, [])

  const sendEvent = useCallback(async (event: Omit<RealtimeEvent, "timestamp">) => {
    try {
      const response = await fetch("/api/realtime", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...event, timestamp: Date.now() }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch (error) {
      console.error("[v0] Failed to send realtime event:", error)
    }
  }, [])

  useEffect(() => {
    connect()
    return () => {
      disconnect()
    }
  }, [connect, disconnect])

  return {
    isConnected,
    events,
    sendEvent,
    connect,
    disconnect,
  }
}
