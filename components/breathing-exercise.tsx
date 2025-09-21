"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

export function BreathingExercise() {
  const { t } = useLanguage()
  const [isBreathing, setIsBreathing] = useState(false)
  const [breathState, setBreathState] = useState("Breathe In")
  const [breathCount, setBreathCount] = useState(0)

  useEffect(() => {
    let breathInterval: NodeJS.Timeout

    if (isBreathing) {
      breathInterval = setInterval(() => {
        setBreathState((prevState) => {
          if (prevState === "Breathe In") {
            return "Hold"
          } else if (prevState === "Hold") {
            return "Breathe Out"
          } else {
            setBreathCount((prevCount) => prevCount + 1)
            return "Breathe In"
          }
        })
      }, 4000) // 4 seconds for each state
    }

    return () => clearInterval(breathInterval)
  }, [isBreathing])

  const handleStart = () => {
    setIsBreathing(true)
    setBreathCount(0)
    setBreathState("Breathe In")
  }

  const handleStop = () => {
    setIsBreathing(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("Breathing Exercise")}</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="mb-4">
          <div
            className={`w-32 h-32 rounded-full mx-auto flex items-center justify-center transition-transform duration-2000 ease-in-out ${
              isBreathing && breathState === "Breathe In"
                ? "scale-150 bg-blue-300"
                : isBreathing && breathState === "Hold"
                ? "scale-150 bg-purple-300"
                : isBreathing && breathState === "Breathe Out"
                ? "scale-100 bg-green-300"
                : "bg-gray-200"
            }`}
          >
            <p className="text-lg font-semibold">
              {isBreathing ? t(breathState) : t("Start")}
            </p>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-muted-foreground">
            {t("Completed Cycles")}: {breathCount}
          </p>
        </div>
        <div>
          {!isBreathing ? (
            <Button onClick={handleStart}>{t("Start")}</Button>
          ) : (
            <Button onClick={handleStop} variant="destructive">
              {t("Stop")}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
