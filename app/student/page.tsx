"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  CalendarIcon,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ArrowLeft,
  Leaf,
  TreePine,
  Flower2,
  Gamepad2,
  RotateCcw,
  Wifi,
  WifiOff,
  BookOpen,
  Siren,
  Activity,
  Trophy,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useSOS } from "@/components/sos-provider"
import { SOSModal } from "@/components/sos-modal"
import { useLanguage } from "@/components/language-provider"
import { LanguageSelector } from "@/components/language-selector"
import { AIChatWidget } from "@/components/ai-chat-widget"
import { useRealtimeContext } from "@/components/realtime-provider"
import { MultimediaContentCard } from "@/components/multimedia-content-card"
import { MusicPlayer } from "@/components/music-player"
import { BreathingExercise } from "@/components/breathing-exercise"
import { wellnessContent, wellnessStats, userProgress } from "@/data/wellness-content"

export default function StudentDashboard() {
  console.log("[v0] StudentDashboard component is rendering")

  const [wellnessScore, setWellnessScore] = useState(userProgress.weeklyCompleted * 20) // Based on weekly progress
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showResourceModal, setShowResourceModal] = useState(false)
  const [selectedResource, setSelectedResource] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showSOSModal, setShowSOSModal] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const [bubbleStates, setBubbleStates] = useState(Array(20).fill(false))
  const [isDrawing, setIsDrawing] = useState(false)
  const [spinnerRotation, setSpinnerRotation] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // New states for booking and resource player
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const router = useRouter()
  const { triggerSOS } = useSOS()
  const { t } = useLanguage()
  const { isConnected, sendEvent } = useRealtimeContext()

  // prettier-ignore
  const timeSlots = useMemo(() => ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"], [])

  const filteredContent = useMemo(() => {
    if (activeTab === "all") return wellnessContent
    return wellnessContent.filter((content) => content.type === activeTab)
  }, [activeTab])

  const openResourceModal = useCallback((resource: any) => {
    setSelectedResource(resource)
    setShowResourceModal(true)
    setProgress(0)
    setCurrentTime(0)
    setDuration(0)
    setIsPlaying(false)
    // Reset and load audio
    if (audioRef.current) audioRef.current.src = resource.audio
  }, [])

  const getTreeIcon = useCallback(() => {
    if (wellnessScore < 30) return <Leaf className="w-16 h-16 text-primary/60" />
    if (wellnessScore < 70) return <TreePine className="w-16 h-16 text-primary" />
    return <Flower2 className="w-16 h-16 text-primary" />
  }, [wellnessScore])

  const getTreeMessage = useCallback(() => {
    if (wellnessScore < 30) return t("treeNeedsAttention")
    if (wellnessScore < 70) return t("treeGrowing")
    return t("treeFlourishing")
  }, [wellnessScore, t])

  const updateWellnessScore = useCallback(
    async (increment: number, activity: string) => {
      const newScore = Math.min(100, wellnessScore + increment)
      setWellnessScore(newScore)

      // Send real-time update
      await sendEvent({
        type: "wellness_update",
        data: {
          score: newScore,
          activity,
          message: `Wellness score updated to ${newScore}% after ${activity}`,
        },
      })
    },
    [wellnessScore, sendEvent],
  )

  const handleStartActivity = useCallback(
    async (contentId: string) => {
      const content = wellnessContent.find((c) => c.id === contentId)
      if (content) {
        await updateWellnessScore(5, content.title)
        // Send real-time notification
        await sendEvent({
          type: "activity_started",
          data: {
            contentId,
            title: content.title,
            type: content.type,
            message: `Started ${content.title}`,
          },
        })
      }
    },
    [updateWellnessScore, sendEvent],
  )

  const popBubble = useCallback(
    (index: number) => {
      if (!bubbleStates[index]) {
        const newStates = [...bubbleStates]
        newStates[index] = true
        setBubbleStates(newStates)
        updateWellnessScore(1, "popping bubble")
      }
    },
    [bubbleStates, updateWellnessScore],
  )

  const spinFidget = useCallback(() => {
    setSpinnerRotation((prev) => prev + 360)
    updateWellnessScore(1, "spinning fidget")
  }, [updateWellnessScore])

  const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    draw(e)
  }, [])

  const draw = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDrawing) return

      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      ctx.strokeStyle = "#8b7355"
      ctx.lineWidth = 3
      ctx.lineCap = "round"
      ctx.lineTo(x, y)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x, y)
    },
    [isDrawing],
  )

  const stopDrawing = useCallback(() => {
    setIsDrawing(false)
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.beginPath()

    updateWellnessScore(2, "zen garden drawing")
  }, [updateWellnessScore])

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.fillStyle = "#f4f1de"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  const handleBooking = () => {
    setBookingConfirmed(true)
    setTimeout(() => {
      setShowBookingModal(false)
      setBookingConfirmed(false)
      setSelectedTime(null)
    }, 2000)
  }

  // Resource Player Logic
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const newCurrentTime = audioRef.current.currentTime
      const newDuration = audioRef.current.duration
      setCurrentTime(newCurrentTime)
      setDuration(newDuration)
      setProgress((newCurrentTime / newDuration) * 100)
    }
  }

  const handleEnded = () => {
    setIsPlaying(false)
    setProgress(100)
  }

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    ctx.fillStyle = "#f4f1de"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/")}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("Back to Home")}
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-primary">{t("Student Dashboard")}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {isConnected ? (
                  <Wifi className="w-4 h-4 text-green-500" />
                ) : (
                  <WifiOff className="w-4 h-4 text-red-500" />
                )}
                <span className="text-xs text-muted-foreground">{isConnected ? t("Live") : t("Offline")}</span>
              </div>
              <LanguageSelector />
              <Button
                variant="destructive"
                size="sm"
                className="gap-2 animate-pulse"
                onClick={() => setShowSOSModal(true)}
              >
                <Siren className="w-4 h-4" />
                {t("SOS")}
              </Button>
              <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                {t("Student Dashboard")}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">{t("Welcome Student")}</h1>
            <p className="text-muted-foreground">{t("How are you feeling today? Let's nurture your wellness together.")}</p>
          </div>

          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Heart className="w-6 h-6 text-primary" />
                {t("My WellnessTree")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 text-center">
                  <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    {getTreeIcon()}
                  </div>
                  <p className="text-lg font-medium text-foreground mb-2">
                    {t("wellnessScore")}: {wellnessScore}%
                  </p>
                  <p className="text-muted-foreground text-pretty">{getTreeMessage()}</p>
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>{t("Progress")}</span>
                      <span>{wellnessScore}%</span>
                    </div>
                    <Progress value={wellnessScore} className="h-3" />
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-background/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{userProgress.currentStreak}</div>
                      <div className="text-sm text-muted-foreground">{t("Day Streak")}</div>
                    </div>
                    <div className="p-3 bg-background/50 rounded-lg">
                      <div className="text-2xl font-bold text-accent">{userProgress.totalActivities}</div>
                      <div className="text-sm text-muted-foreground">{t("Total Activities")}</div>
                    </div>
                    <div className="p-3 bg-background/50 rounded-lg">
                      <div className="text-2xl font-bold text-secondary">
                        {userProgress.weeklyCompleted}/{userProgress.weeklyGoal}
                      </div>
                      <div className="text-sm text-muted-foreground">{t("Weekly Goal")}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-primary" />
                {t("Wellness Content Library")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="all">{t("All")}</TabsTrigger>
                  <TabsTrigger value="meditation">{t("Meditation")}</TabsTrigger>
                  <TabsTrigger value="exercise">{t("Exercise")}</TabsTrigger>
                  <TabsTrigger value="nutrition">{t("Nutrition")}</TabsTrigger>
                  <TabsTrigger value="sleep">{t("Sleep")}</TabsTrigger>
                  <TabsTrigger value="mindfulness">{t("Mindfulness")}</TabsTrigger>
                </TabsList>
                <TabsContent value={activeTab} className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredContent.map((content) => (
                      <MultimediaContentCard key={content.id} content={content} onStart={handleStartActivity} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Trophy className="w-5 h-5 text-yellow-500" />
                {t("yourAchievements")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userProgress.achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border ${
                      achievement.earned
                        ? "bg-yellow-50 border-yellow-200 text-yellow-800"
                        : "bg-gray-50 border-gray-200 text-gray-500"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Trophy className={`w-6 h-6 ${achievement.earned ? "text-yellow-500" : "text-gray-400"}`} />
                      <div>
                        <h3 className="font-semibold">{t(achievement.title)}</h3>
                        <p className="text-sm">{t(achievement.description)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-blue-500" />
                {t("communityStats")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{wellnessStats.totalUsers.toLocaleString()}</div>
                  <div className="text-sm text-blue-700">{t("totalUsers")}</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{wellnessStats.activeSessions}</div>
                  <div className="text-sm text-green-700">{t("activeNow")}</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {wellnessStats.completedActivities.toLocaleString()}
                  </div>
                  <div className="text-sm text-purple-700">{t("activitiesDone")}</div>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{wellnessStats.averageWellnessScore}</div>
                  <div className="text-sm text-orange-700">{t("avgScore")}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-accent" />
                {t("resourceHub")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {wellnessContent.map((resource) => (
                  <Card
                    key={resource.id}
                    className="cursor-pointer hover:shadow-md transition-all duration-200 border-primary/10 hover:border-primary/30"
                    onClick={() => openResourceModal(resource)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Play className="w-6 h-6 text-accent" />
                      </div>
                      <h3 className="font-semibold mb-2 text-sm">{resource.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{resource.description}</p>
                      <Badge variant="outline" className="text-xs">
                        {resource.duration}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <CalendarIcon className="w-5 h-5 text-secondary" />
                {t("Confidential Support")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  {t("Need to talk to someone? Book a confidential appointment with our qualified counselors.")}
                </p>
                <Button
                  onClick={() => setShowBookingModal(true)}
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {t("Book Appointment")}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Gamepad2 className="w-5 h-5 text-accent" />
                {t("antistressGames")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-primary/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{t("bubbleWrap")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-5 gap-2 mb-4">
                      {bubbleStates.map((popped, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className={`w-8 h-8 rounded-full p-0 ${
                            popped
                              ? "bg-muted border-muted-foreground/20"
                              : "bg-primary/20 border-primary hover:bg-primary/30"
                          }`}
                          onClick={() => popBubble(index)}
                          disabled={popped}
                        >
                          {!popped && "○"}
                        </Button>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setBubbleStates(Array(20).fill(false))}
                      className="w-full"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      {t("Reset")}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-primary/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{t("zenGarden")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <canvas
                      ref={canvasRef}
                      className="w-full h-32 border border-border rounded cursor-crosshair bg-amber-50"
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                    />
                    <Button variant="outline" size="sm" onClick={clearCanvas} className="w-full mt-2 bg-transparent">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      {t("Clear Sand")}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-primary/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{t("fidgetSpinner")}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="mb-4">
                      <div
                        className="w-20 h-20 mx-auto cursor-pointer transition-transform duration-1000 ease-out"
                        style={{ transform: `rotate(${spinnerRotation}deg)` }}
                        onClick={spinFidget}
                      >
                        <div className="relative w-full h-full">
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full"></div>
                          <div className="absolute bottom-0 left-0 w-6 h-6 bg-accent rounded-full"></div>
                          <div className="absolute bottom-0 right-0 w-6 h-6 bg-secondary rounded-full"></div>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-foreground rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={spinFidget} className="w-full bg-transparent">
                      {t("Spin")}
                    </Button>
                  </CardContent>
                </Card>
                <BreathingExercise />
              </div>
            </CardContent>
          </Card>

          <MusicPlayer />
        </div>
      </main>

      <AIChatWidget />

      <SOSModal open={showSOSModal} onOpenChange={setShowSOSModal} />

      <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-secondary">
              {t("Book Confidential Appointment")}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {bookingConfirmed ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold">{t("Booking Confirmed!")}</h3>
                <p className="text-muted-foreground">
                  {t("Your appointment on {date} at {time} is confirmed.").replace("{date}", selectedDate?.toDateString() ?? "").replace("{time}", selectedTime ?? "")}
                </p>
              </div>
            ) : (
              <>
                <div>
                  <h3 className="font-semibold mb-3">{t("Select Date")}</h3>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                    disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                  />
                </div>

                {selectedDate && (
                  <div>
                    <h3 className="font-semibold mb-3">{t("Available Time Slots")}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((slot) => (
                        <Button
                          key={slot}
                          variant={selectedTime === slot ? "secondary" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTime(slot)}
                          className="bg-transparent"
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
            <div className="text-center pt-4">
              <div>
                {!bookingConfirmed && (
                  <Button onClick={handleBooking} disabled={!selectedDate || !selectedTime}>
                    {t("Confirm Booking")}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showResourceModal} onOpenChange={setShowResourceModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-accent">{selectedResource?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">{selectedResource?.description}</p>
              <div className="flex items-center justify-center gap-4">
                <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={handleEnded} src={selectedResource?.audio} />
                <Button variant="outline" size="sm" onClick={togglePlay} className="hover:bg-accent/10">
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      {t("Pause")}
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      {t("Play")}
                    </>
                  )}
                </Button>
                <Button variant="outline" size="sm" onClick={toggleMute}>
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {selectedResource?.audio && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
