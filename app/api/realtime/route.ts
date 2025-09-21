import type { NextRequest } from "next/server"
import { TextEncoder } from "util"

// Store active connections
const connections = new Set<ReadableStreamDefaultController>()

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      connections.add(controller)

      // Send initial connection event with proper SSE format
      const welcomeEvent = `data: ${JSON.stringify({
        type: "connection",
        data: { message: "Connected to Soukhyam realtime updates" },
        timestamp: Date.now(),
      })}\n\n`

      controller.enqueue(new TextEncoder().encode(welcomeEvent))

      // Send heartbeat every 30 seconds
      const heartbeat = setInterval(() => {
        try {
          const heartbeatEvent = `data: ${JSON.stringify({
            type: "heartbeat",
            data: { message: "ping" },
            timestamp: Date.now(),
          })}\n\n`
          controller.enqueue(new TextEncoder().encode(heartbeatEvent))
        } catch (error) {
          clearInterval(heartbeat)
          connections.delete(controller)
        }
      }, 30000)

      // Cleanup on close
      return () => {
        clearInterval(heartbeat)
        connections.delete(controller)
      }
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Cache-Control",
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const event = await request.json()

    // Broadcast event to all connected clients
    const eventData = `data: ${JSON.stringify(event)}\n\n`

    connections.forEach((controller) => {
      try {
        controller.enqueue(new TextEncoder().encode(eventData))
      } catch (error) {
        // Remove dead connections
        connections.delete(controller)
      }
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error("[v0] Realtime POST error:", error)
    return Response.json({ error: "Failed to broadcast event" }, { status: 500 })
  }
}
