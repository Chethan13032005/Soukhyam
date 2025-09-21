"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from "lucide-react"

interface MultimediaPlayerProps {
  title: string
  src?: string
  type: "audio" | "video"
  poster?: string
  onPlay?: () => void
  onPause?: () => void
  onEnded?: () => void
}

export function MultimediaPlayer({ title, src, type, poster, onPlay, onPause, onEnded }: MultimediaPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const mediaRef = useRef<HTMLAudioElement | HTMLVideoElement>(null)

  const togglePlay = () => {
    if (!mediaRef.current) return

    if (isPlaying) {
      mediaRef.current.pause()
      setIsPlaying(false)
      onPause?.()
    } else {
      mediaRef.current.play()
      setIsPlaying(true)
      onPlay?.()
    }
  }

  const toggleMute = () => {
    if (!mediaRef.current) return

    const newMuted = !isMuted
    mediaRef.current.muted = newMuted
    setIsMuted(newMuted)
  }

  const handleTimeUpdate = () => {
    if (!mediaRef.current) return
    setCurrentTime(mediaRef.current.currentTime)
  }

  const handleLoadedMetadata = () => {
    if (!mediaRef.current) return
    setDuration(mediaRef.current.duration)
  }

  const handleSeek = (value: number[]) => {
    if (!mediaRef.current) return
    const newTime = value[0]
    mediaRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (value: number[]) => {
    if (!mediaRef.current) return
    const newVolume = value[0]
    mediaRef.current.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const skipTime = (seconds: number) => {
    if (!mediaRef.current) return
    const newTime = Math.max(0, Math.min(duration, currentTime + seconds))
    mediaRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  useEffect(() => {
    const media = mediaRef.current
    if (!media) return

    const handleEnded = () => {
      setIsPlaying(false)
      onEnded?.()
    }

    media.addEventListener("timeupdate", handleTimeUpdate)
    media.addEventListener("loadedmetadata", handleLoadedMetadata)
    media.addEventListener("ended", handleEnded)

    return () => {
      media.removeEventListener("timeupdate", handleTimeUpdate)
      media.removeEventListener("loadedmetadata", handleLoadedMetadata)
      media.removeEventListener("ended", handleEnded)
    }
  }, [onEnded])

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">{title}</h3>

          {type === "video" ? (
            <video
              ref={mediaRef as React.RefObject<HTMLVideoElement>}
              className="w-full rounded-lg"
              poster={poster}
              preload="metadata"
            >
              {src && <source src={src} />}
              Your browser does not support the video element.
            </video>
          ) : (
            <div className="flex items-center justify-center h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg">
              <div className="text-center">
                <Volume2 className="w-12 h-12 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Audio Content</p>
              </div>
              <audio ref={mediaRef as React.RefObject<HTMLAudioElement>} preload="metadata">
                {src && <source src={src} />}
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          {/* Progress Bar */}
          <div className="space-y-2">
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              onValueChange={handleSeek}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => skipTime(-10)} disabled={!src}>
                <SkipBack className="w-4 h-4" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={togglePlay}
                disabled={!src}
                className="w-12 h-12 rounded-full bg-transparent"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>

              <Button variant="outline" size="sm" onClick={() => skipTime(10)} disabled={!src}>
                <SkipForward className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={toggleMute} disabled={!src}>
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>

              <div className="w-20">
                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={1}
                  step={0.1}
                  onValueChange={handleVolumeChange}
                  disabled={!src}
                />
              </div>
            </div>
          </div>

          {!src && (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground">
                Media content will be available when you start the activity
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
