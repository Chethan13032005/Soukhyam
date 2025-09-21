export interface WellnessContent {
  id: string
  title: string
  description: string
  type: "meditation" | "exercise" | "nutrition" | "sleep" | "mindfulness"
  duration?: string
  difficulty: "beginner" | "intermediate" | "advanced"
  image: string
  video?: string
  audio?: string
  tags: string[]
  benefits: string[]
  instructions?: string[]
}

export const wellnessContent: WellnessContent[] = [
  {
    id: "1",
    title: "Morning Meditation",
    description:
      "Start your day with a peaceful 10-minute guided meditation to center your mind and set positive intentions.",
    type: "meditation",
    duration: "10 min",
    difficulty: "beginner",
    image: "/peaceful-morning-meditation-scene-with-sunrise.jpg",
    audio: "/placeholder.mp3?query=calming meditation music",
    tags: ["morning", "mindfulness", "breathing"],
    benefits: ["Reduces stress", "Improves focus", "Enhances mood"],
    instructions: [
      "Find a comfortable seated position",
      "Close your eyes and take three deep breaths",
      "Focus on your natural breathing rhythm",
      "When thoughts arise, gently return to your breath",
    ],
  },
  {
    id: "2",
    title: "Yoga Flow for Beginners",
    description: "A gentle 15-minute yoga sequence perfect for beginners to improve flexibility and reduce tension.",
    type: "exercise",
    duration: "15 min",
    difficulty: "beginner",
    image: "/person-doing-yoga-poses-in-peaceful-studio.jpg",
    video: "/placeholder.mp4?query=beginner yoga flow demonstration",
    tags: ["yoga", "flexibility", "relaxation"],
    benefits: ["Improves flexibility", "Reduces muscle tension", "Enhances balance"],
    instructions: [
      "Start in mountain pose",
      "Move through sun salutation A",
      "Hold each pose for 5 breaths",
      "End in child's pose for relaxation",
    ],
  },
  {
    id: "3",
    title: "Healthy Smoothie Bowl",
    description: "Nutritious and colorful smoothie bowl packed with antioxidants, vitamins, and natural energy.",
    type: "nutrition",
    duration: "5 min",
    difficulty: "beginner",
    image: "/colorful-healthy-smoothie-bowl-with-fruits-and-nut.jpg",
    tags: ["breakfast", "antioxidants", "energy"],
    benefits: ["Boosts energy", "Provides essential nutrients", "Supports immune system"],
    instructions: [
      "Blend frozen berries with banana and spinach",
      "Add coconut milk for creaminess",
      "Top with granola, nuts, and fresh fruit",
      "Enjoy immediately for best texture",
    ],
  },
  {
    id: "4",
    title: "Sleep Stories: Forest Walk",
    description:
      "Drift off to sleep with this calming story that takes you on a peaceful walk through an enchanted forest.",
    type: "sleep",
    duration: "20 min",
    difficulty: "beginner",
    image: "/peaceful-forest-path-with-soft-moonlight.jpg",
    audio: "/placeholder.mp3?query=calming sleep story with nature sounds",
    tags: ["bedtime", "relaxation", "nature"],
    benefits: ["Improves sleep quality", "Reduces anxiety", "Calms the mind"],
    instructions: [
      "Lie down in a comfortable position",
      "Close your eyes and listen to the story",
      "Let your imagination follow the peaceful journey",
      "Allow yourself to drift off naturally",
    ],
  },
  {
    id: "5",
    title: "Mindful Breathing Exercise",
    description:
      "A simple yet powerful breathing technique to reduce stress and increase mental clarity in just 5 minutes.",
    type: "mindfulness",
    duration: "5 min",
    difficulty: "beginner",
    image: "/person-practicing-mindful-breathing-in-nature.jpg",
    audio: "/placeholder.mp3?query=guided breathing exercise with gentle chimes",
    tags: ["breathing", "stress-relief", "quick"],
    benefits: ["Reduces stress", "Improves focus", "Lowers blood pressure"],
    instructions: [
      "Sit comfortably with your back straight",
      "Breathe in slowly for 4 counts",
      "Hold your breath for 4 counts",
      "Exhale slowly for 6 counts",
      "Repeat for 5 minutes",
    ],
  },
  {
    id: "6",
    title: "High-Intensity Interval Training",
    description:
      "Boost your metabolism and build strength with this 20-minute HIIT workout that requires no equipment.",
    type: "exercise",
    duration: "20 min",
    difficulty: "intermediate",
    image: "/person-doing-hiit-workout-exercises.jpg",
    video: "/placeholder.mp4?query=HIIT workout demonstration with timer",
    tags: ["cardio", "strength", "fat-burning"],
    benefits: ["Burns calories", "Builds muscle", "Improves cardiovascular health"],
    instructions: [
      "Warm up with light movement for 3 minutes",
      "Perform each exercise for 45 seconds",
      "Rest for 15 seconds between exercises",
      "Complete 3 rounds of the circuit",
      "Cool down with stretching",
    ],
  },
]

export const wellnessStats = {
  totalUsers: 12847,
  activeSessions: 234,
  completedActivities: 45623,
  averageWellnessScore: 7.8,
  topCategories: ["meditation", "exercise", "mindfulness"],
}

export const userProgress = {
  currentStreak: 7,
  totalActivities: 156,
  favoriteCategory: "meditation",
  weeklyGoal: 5,
  weeklyCompleted: 3,
  achievements: [
    { id: "1", title: "First Steps", description: "Completed your first wellness activity", earned: true },
    { id: "2", title: "Week Warrior", description: "Maintained a 7-day streak", earned: true },
    { id: "3", title: "Meditation Master", description: "Completed 50 meditation sessions", earned: false },
    { id: "4", title: "Fitness Fanatic", description: "Completed 25 exercise activities", earned: false },
  ],
}
