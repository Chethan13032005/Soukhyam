"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { ScrollArea } from "./ui/scroll-area"
import { Send, X, Brain, AlertTriangle } from "lucide-react"
import { useSOS } from "./sos-provider"
import { useLanguage } from "./language-provider"
import { Badge } from "./ui/badge"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  isEmergency?: boolean
}

export function AIChatWidget() {
  const [showChat, setShowChat] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I'm AI Dost, your caring companion for mental wellness. I'm here to listen without judgment and support you through whatever you're feeling. How are you doing today? 🌱",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { triggerSOS } = useSOS()
  const { language } = useLanguage()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const crisisKeywords = [
    "suicide",
    "kill myself",
    "end my life",
    "want to die",
    "better off dead",
    "harm myself",
    "hurt myself",
    "self harm",
    "cut myself",
    "overdose",
    "jump off",
    "hang myself",
    "worthless",
    "hopeless",
    "can't go on",
    "give up",
    "no point",
    "everyone would be better",
    "tired of living",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    }

    const inputText = input.toLowerCase()
    const isCrisisMessage = crisisKeywords.some((keyword) => inputText.includes(keyword))

    if (isCrisisMessage) {
      triggerSOS("student-ai-chat", `Crisis detected: ${input}`)

      const crisisResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I hear how painful this feels for you right now. You are not alone, and your safety is very important to me. 💙 Please reach out immediately to someone you trust or call the Tele-MANAS helpline at 14416 for professional support. Would you like me to help connect you with your college counsellor right now?",
        isEmergency: true,
      }

      setMessages((prev) => [...prev, userMessage, crisisResponse])
      setInput("")
      return
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          language,
        }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const data = await response.json()
      if (data.error) throw new Error(data.error)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      setError(
        "I'm having trouble connecting right now. Please try again, or if this is urgent, please reach out to a counsellor or call Tele-MANAS at 14416.",
      )
      console.error("Chat error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!showChat ? (
        <Button
          onClick={() => setShowChat(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg animate-pulse"
        >
          <Brain className="w-8 h-8" />
        </Button>
      ) : (
        <Card className="w-80 h-[500px] shadow-xl border-primary/20 flex flex-col">
          <CardHeader className="pb-3 bg-gradient-to-r from-primary to-accent text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                <CardTitle className="text-lg">AI Dost</CardTitle>
                <Badge variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
                  Online
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowChat(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-white/80">Your caring companion for mental wellness</p>
          </CardHeader>

          <CardContent className="p-0 flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 h-0">
              <ScrollArea className="h-full p-4">
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-lg text-sm break-words whitespace-pre-wrap ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-primary to-accent text-white"
                            : message.isEmergency
                            ? "bg-red-50 text-red-800 border border-red-200"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {message.isEmergency && (
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-4 h-4 text-red-600" />
                            <span className="text-xs font-semibold text-red-600">CRISIS SUPPORT</span>
                          </div>
                        )}
                        {message.content}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] p-3 rounded-lg text-sm bg-muted text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-current rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-current rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="flex justify-start">
                    <div className="max-w-[85%] p-3 rounded-lg text-sm bg-orange-50 text-orange-800 border border-orange-200">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className="w-4 h-4 text-orange-600" />
                        <span className="text-xs font-semibold">Connection Issue</span>
                      </div>
                      {error}
                    </div>
                  </div>
                )}
              </ScrollArea>
            </div>

            <div className="p-4 border-t bg-gradient-to-r from-primary/5 to-accent/5">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Share what's on your mind..."
                  className="flex-1 border-primary/20 focus:border-primary"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="sm"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white"
                  disabled={isLoading || !input.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Confidential • Available 24/7 • Crisis support: 14416
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
