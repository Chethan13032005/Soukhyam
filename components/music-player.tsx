"use client"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const playlist = [
  {
    title: "Peaceful Morning",
    src: "/music/peaceful-morning.mp3",
  },
  {
    title: "Relaxing Forest",
    src: "/music/relaxing-forest.mp3",
  },
  {
    title: "Calm Ocean",
    src: "/music/calm-ocean.mp3",
  },
]

export function MusicPlayer() {
  const { t } = useLanguage()
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const currentTrack = playlist[currentTrackIndex]

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

  const playNext = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length)
  }

  const playPrevious = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length)
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">{t(currentTrack.title)}</h3>
            <p className="text-sm text-muted-foreground">{t("Relaxing Music")}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={playPrevious}>
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={togglePlay}>
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="icon" onClick={playNext}>
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={toggleMute}>
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <audio
          ref={audioRef}
          src={currentTrack.src}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={playNext}
          className="hidden"
        />
      </CardContent>
    </Card>
  )
}
