"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Heart, ArrowLeft, TrendingUp, Users, AlertTriangle, MapPin, Activity, Lightbulb } from "lucide-react"
import { useRouter } from "next/navigation"
import { SOSAlertBanner } from "@/components/sos-alert-banner"

export default function AdminDashboard() {
  const router = useRouter()

  // Mock analytics data
  const stressLevelsData = [
    { month: "Jan", level: 65 },
    { month: "Feb", level: 72 },
    { month: "Mar", level: 68 },
    { month: "Apr", level: 75 },
    { month: "May", level: 82 },
    { month: "Jun", level: 78 },
  ]

  const counselorDemandData = [
    { district: "North Campus", demand: 85, capacity: 100 },
    { district: "South Campus", demand: 92, capacity: 80 },
    { district: "East Campus", demand: 67, capacity: 90 },
    { district: "West Campus", demand: 78, capacity: 85 },
    { district: "Central Campus", demand: 95, capacity: 70 },
  ]

  const wellnessEngagementData = [
    { name: "Meditation", value: 35, color: "#059669" },
    { name: "Counseling", value: 25, color: "#d97706" },
    { name: "Games", value: 20, color: "#374151" },
    { name: "Resources", value: 20, color: "#f1f5f9" },
  ]

  const usageData = [
    { day: "Mon", students: 120, sessions: 45 },
    { day: "Tue", students: 135, sessions: 52 },
    { day: "Wed", students: 148, sessions: 48 },
    { day: "Thu", students: 162, sessions: 58 },
    { day: "Fri", students: 178, sessions: 62 },
    { day: "Sat", students: 95, sessions: 28 },
    { day: "Sun", students: 87, sessions: 22 },
  ]

  const peopleBenefited = 15234;
  const aiProgramSuggestions = [
      "Launch a targeted campaign on 'Exam Stress' in the North Campus.",
      "Increase counselor capacity in the South Campus to meet demand.",
      "Promote meditation and mindfulness resources to improve overall wellness.",
  ]

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
            <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20">
              Government Dashboard
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* SOS Alert Banner */}
          <SOSAlertBanner userRole="admin" />

          {/* Welcome Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Government Dashboard</h1>
            <p className="text-muted-foreground">State-level analytics and insights for student wellness.</p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Students</p>
                    <p className="text-2xl font-bold text-primary">2,847</p>
                    <p className="text-xs text-green-600">+12% from last month</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Sessions</p>
                    <p className="text-2xl font-bold text-accent">156</p>
                    <p className="text-xs text-green-600">+8% from yesterday</p>
                  </div>
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Activity className="w-6 h-6 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Crisis Alerts</p>
                    <p className="text-2xl font-bold text-destructive">3</p>
                    <p className="text-xs text-red-600">Requires attention</p>
                  </div>
                  <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-destructive" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Wellness Score</p>
                    <p className="text-2xl font-bold text-secondary">72%</p>
                    <p className="text-xs text-green-600">+5% improvement</p>
                  </div>
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-secondary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI-Powered Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="bg-background/70 border-gray-200 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">People Benefited</CardTitle>
                <Users className="h-6 w-6 text-primary" />
                </CardHeader>
                <CardContent>
                <div className="text-4xl font-bold">{peopleBenefited}</div>
                <p className="text-xs text-muted-foreground">+10% from last campaign</p>
                </CardContent>
            </Card>
            <Card className="bg-background/70 border-gray-200 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">AI Program Suggestions</CardTitle>
                <Lightbulb className="h-6 w-6 text-yellow-500" />
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        {aiProgramSuggestions.map((rec, index) => (
                            <li key={index} className="flex items-start">
                                <Lightbulb className="h-4 w-4 mr-2 mt-1 text-yellow-500 flex-shrink-0" />
                                <span>{rec}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Campus Stress Levels */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Campus Stress Levels
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={stressLevelsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="level" stroke="#059669" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Daily Usage */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-accent" />
                  Daily Platform Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="students" fill="#059669" />
                    <Bar dataKey="sessions" fill="#d97706" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Counselor Demand by District */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-secondary" />
                  Counselor Demand by District
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {counselorDemandData.map((district) => (
                    <div key={district.district} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{district.district}</span>
                        <span className="text-muted-foreground">
                          {district.demand}/{district.capacity}
                        </span>
                      </div>
                      <Progress value={(district.demand / district.capacity) * 100} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Demand: {district.demand}%</span>
                        <span className={district.demand > district.capacity ? "text-destructive" : "text-green-600"}>
                          {district.demand > district.capacity ? "Over capacity" : "Within capacity"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Wellness Engagement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-primary" />
                  Wellness Engagement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={wellnessEngagementData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {wellnessEngagementData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {wellnessEngagementData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span>{item.name}</span>
                      </div>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Crisis Management */}
          <Card className="border-destructive/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-destructive">
                <AlertTriangle className="w-5 h-5" />
                Crisis Oversight
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-destructive/5 rounded-lg">
                  <div className="text-2xl font-bold text-destructive">3</div>
                  <div className="text-sm text-muted-foreground">Active Alerts</div>
                </div>
                <div className="text-center p-4 bg-secondary/5 rounded-lg">
                  <div className="text-2xl font-bold text-secondary">12</div>
                  <div className="text-sm text-muted-foreground">Resolved Today</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary">2.3 min</div>
                  <div className="text-sm text-muted-foreground">Avg Response Time</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}