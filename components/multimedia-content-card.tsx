"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Clock, Heart } from "lucide-react"
import type { WellnessContent } from "@/data/wellness-content"

interface MultimediaContentCardProps {
  content: WellnessContent
  onStart?: (contentId: string) => void
}

export function MultimediaContentCard({ content, onStart }: MultimediaContentCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)

  const handlePlay = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying && onStart) {
      onStart(content.id)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "meditation":
        return "bg-purple-100 text-purple-800"
      case "exercise":
        return "bg-blue-100 text-blue-800"
      case "nutrition":
        return "bg-green-100 text-green-800"
      case "sleep":
        return "bg-indigo-100 text-indigo-800"
      case "mindfulness":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img src={content.image || "/placeholder.svg"} alt={content.title} className="w-full h-48 object-cover" />
        <div className="absolute top-2 right-2 flex gap-2">
          <Badge className={getDifficultyColor(content.difficulty)}>{content.difficulty}</Badge>
          <Badge className={getTypeColor(content.type)}>{content.type}</Badge>
        </div>
        {(content.video || content.audio) && (
          <Button size="sm" className="absolute bottom-2 right-2" onClick={handlePlay}>
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        )}
      </div>

      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{content.title}</CardTitle>
            <CardDescription className="mt-1">{content.description}</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsFavorited(!isFavorited)} className="ml-2">
            <Heart className={`h-4 w-4 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
        </div>

        {content.duration && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {content.duration}
          </div>
        )}
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-sm mb-2">Benefits:</h4>
            <div className="flex flex-wrap gap-1">
              {content.benefits.map((benefit, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {benefit}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {content.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>

          {content.instructions && (
            <div>
              <h4 className="font-medium text-sm mb-2">Quick Instructions:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {content.instructions.slice(0, 2).map((instruction, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    {instruction}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Button className="w-full" onClick={() => onStart?.(content.id)}>
            Start Activity
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
