"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Heart, ArrowLeft, CalendarIcon, Users, Clock, MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"
import { SOSAlertBanner } from "@/components/sos-alert-banner"

export default function CounselorDashboard() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const router = useRouter()

  // Mock appointments data
  const appointments = [
    {
      id: 1,
      time: "9:00 AM",
      student: "Student A",
      type: "Individual Session",
      status: "confirmed",
    },
    {
      id: 2,
      time: "10:30 AM",
      student: "Student B",
      type: "Crisis Support",
      status: "urgent",
    },
    {
      id: 3,
      time: "2:00 PM",
      student: "Student C",
      type: "Follow-up",
      status: "confirmed",
    },
    {
      id: 4,
      time: "3:30 PM",
      student: "Student D",
      type: "Group Prep",
      status: "pending",
    },
  ]

  // Mock group sessions
  const groupSessions = [
    {
      id: 1,
      title: "Stress Management Workshop",
      date: "Today, 4:00 PM",
      participants: 8,
      maxParticipants: 12,
    },
    {
      id: 2,
      title: "Anxiety Support Group",
      date: "Tomorrow, 11:00 AM",
      participants: 6,
      maxParticipants: 10,
    },
    {
      id: 3,
      title: "Mindfulness Circle",
      date: "Friday, 3:00 PM",
      participants: 10,
      maxParticipants: 15,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "urgent":
        return "bg-destructive text-destructive-foreground"
      case "confirmed":
        return "bg-primary text-primary-foreground"
      case "pending":
        return "bg-secondary text-secondary-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      {/* Header */}
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
                Back to Home
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-primary">Soukhyam</span>
              </div>
            </div>
            <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
              Counselor Dashboard
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* SOS Alert Banner */}
          <SOSAlertBanner userRole="counselor" />

          {/* Welcome Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Counselor Dashboard</h1>
            <p className="text-muted-foreground">Supporting student wellness with compassionate care.</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CalendarIcon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary">12</div>
                <div className="text-sm text-muted-foreground">Today's Sessions</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div className="text-2xl font-bold text-accent">45</div>
                <div className="text-sm text-muted-foreground">Active Students</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
                <div className="text-2xl font-bold text-secondary">6.5</div>
                <div className="text-sm text-muted-foreground">Hours Today</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary">3</div>
                <div className="text-sm text-muted-foreground">Group Sessions</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar and Appointments */}
            <div className="lg:col-span-2 space-y-6">
              {/* Calendar */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                    Appointment Calendar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border w-full"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-4">
                        {selectedDate ? selectedDate.toDateString() : "Select a date"}
                      </h3>
                      <div className="space-y-3">
                        {appointments.map((appointment) => (
                          <div
                            key={appointment.id}
                            className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className="text-xs">
                                  {appointment.student
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-sm">{appointment.time}</div>
                                <div className="text-xs text-muted-foreground">{appointment.type}</div>
                              </div>
                            </div>
                            <Badge className={`text-xs ${getStatusColor(appointment.status)}`}>
                              {appointment.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Group Sessions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-accent" />
                    Counselor-Led Groups
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {groupSessions.map((session) => (
                      <Card key={session.id} className="border-accent/20">
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-2 text-sm">{session.title}</h4>
                          <p className="text-xs text-muted-foreground mb-3">{session.date}</p>
                          <div className="flex items-center justify-between">
                            <div className="text-xs">
                              <span className="font-medium">{session.participants}</span>
                              <span className="text-muted-foreground">/{session.maxParticipants} participants</span>
                            </div>
                            <Button variant="outline" size="sm" className="text-xs bg-transparent">
                              Manage
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-primary hover:bg-primary/90">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    Schedule New Session
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Users className="w-4 h-4 mr-2" />
                    Create Group Session
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Resources
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
