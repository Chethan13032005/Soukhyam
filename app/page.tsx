"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Headphones, Building2, Shield, Brain, ArrowRight, Menu, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { LanguageSelector } from "@/components/language-selector"
import "./landing-page.css"

const Counter = ({ to }) => (
  <div className="transition-all duration-700 ease-in-out text-4xl font-bold text-white hover:scale-110">{to}+</div>
);

export default function LandingPage() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showFeatureModal, setShowFeatureModal] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const { t } = useLanguage()

  const handleRoleLogin = (role: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userRole", role)
    }
    setShowLoginModal(false)
    if (role === "government") {
      router.push(`/admin`)
    } else if (role === "admin") {
      router.push(`/college-admin`)
    } else {
      router.push(`/${role}`)
    }
  }

  const features = [
    {
      id: "students",
      icon: GraduationCap,
      title: t("For Students"),
      description: "AI chatbot, wellness tools, peer support, and gamified wellness journeys.",
      color: "#8DCFB3",
      details:
        "Access AI Dost chatbot for 24/7 support, track your mood and wellness journey, book confidential counseling sessions, join anonymous peer forums, and build your wellness tree through gamified activities.",
    },
    {
      id: "counsellors",
      icon: Headphones,
      title: t("For Counsellors"),
      description: "Manage cases, streamline bookings, and track student progress effectively.",
      color: "#A7D3F3",
      details:
        "Manage student bookings and appointments, maintain encrypted case notes, track student progress with mood analytics, receive AI-powered alerts for high-risk cases, and provide professional support through our secure platform.",
    },
    {
      id: "institutions",
      icon: Building2,
      title: t("For Institutions"),
      description: "Gain wellness analytics, generate reports, and derive policy insights.",
      color: "#C3A7F3",
      details:
        "Access comprehensive wellness analytics, generate policy reports for IQAC, view department-wise stress heatmaps, get AI-powered pulse reports, and make data-driven decisions for student welfare programs.",
    },
    {
      id: "government",
      icon: Shield,
      title: t("For Government"),
      description: "Monitor state-level data and integrate with national health initiatives.",
      color: "#FFD166",
      details:
        "Monitor state-level mental health trends, compare institutional performance, access policy support reports, integrate with Tele-MANAS helpline, and support evidence-based mental health policy making.",
    },
  ]

  const testimonials = [
    {
      quote: "Soukhyam helped me overcome exam stress.",
      author: "Student",
    },
    {
      quote: "The dashboard makes it easy to track cases.",
      author: "Counsellor",
    },
    {
      quote: "Data-driven insights improved student well-being.",
      author: "Admin",
    },
  ]

  return (
  <div className="min-h-screen bg-gradient-to-b from-[#e6f4f1] via-[#dbeafe] to-white text-[#222] smooth-scroll">
      {/* Navbar */}
  <nav className="sticky top-0 z-50 bg-white backdrop-blur-sm shadow-md">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#8DCFB3] to-[#A7D3F3] rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-[#222] drop-shadow">Soukhyam</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="hover:text-[#222] transition-colors">Features</a>
            <a href="#about" className="hover:text-[#222] transition-colors">Who We Are</a>
            <a href="#testimonials" className="hover:text-[#222] transition-colors">Testimonials</a>
            <a href="#contact" className="hover:text-[#222] transition-colors">Contact</a>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <LanguageSelector />
              <span className="text-sm text-[#222]">Language</span>
            </div>
            <Button
              className="bg-[#8DCFB3] text-white shadow-md hover:bg-[#6bb89c] transition-shadow rounded-lg"
              onClick={() => setShowLoginModal(true)}
            >
              Login
            </Button>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white py-4">
            <div className="container mx-auto px-4 flex flex-col gap-4">
              <a href="#features" className="hover:text-[#8DCFB3] transition-colors" onClick={() => setIsMenuOpen(false)}>Features</a>
              <a href="#about" className="hover:text-[#8DCFB3] transition-colors" onClick={() => setIsMenuOpen(false)}>Who We Are</a>
              <a href="#testimonials" className="hover:text-[#8DCFB3] transition-colors" onClick={() => setIsMenuOpen(false)}>Testimonials</a>
              <a href="#contact" className="hover:text-[#8DCFB3] transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</a>
              <LanguageSelector />
              <Button
                className="bg-gradient-to-r from-[#8DCFB3] to-[#A7D3F3] text-white shadow-md hover:shadow-lg transition-shadow"
                onClick={() => {
                  setShowLoginModal(true)
                  setIsMenuOpen(false)
                }}
              >
                Login
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
  <section className="bg-gradient-to-b from-[#e6f4f1] via-[#dbeafe] to-white text-[#222] py-20 sm:py-32">
        <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg animate-fade-in">Soukhyam</h1>
            <p className="text-xl sm:text-2xl font-semibold mb-6 animate-fade-in delay-100">Your Companion for Student Well-being</p>
            <p className="text-lg sm:text-xl mb-10 max-w-3xl mx-auto animate-fade-in delay-200">India’s first open-source, stigma-free digital mental health platform, creating a supportive ecosystem for students, counsellors, and institutions.</p>
            <div className="flex justify-center gap-4 animate-fade-in delay-300">
              <Button
                size="lg"
                className="text-lg px-10 py-6 bg-[#8DCFB3] text-[#222] hover:bg-[#6bb89c] hover:text-white shadow-lg rounded-lg transform hover:scale-105 transition-transform font-bold"
                onClick={() => setShowLoginModal(true)}
              >
                🚀 Get Started Now
              </Button>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="hover:scale-105 transition-transform">
                <div className="text-5xl font-extrabold text-[#222]">1000+</div>
                <p className="text-lg text-[#222]">Students Reached</p>
              </div>
              <div className="hover:scale-105 transition-transform">
                <div className="text-5xl font-extrabold text-[#222]">50+</div>
                <p className="text-lg text-[#222]">Counsellors Onboarded</p>
              </div>
              <div className="hover:scale-105 transition-transform">
                <div className="text-5xl font-extrabold text-[#222]">10+</div>
                <p className="text-lg text-[#222]">Institutions Supported</p>
              </div>
            </div>
        </div>
      </section>

      {/* What We Do Section */}
  <section id="features" className="py-20 sm:py-32 bg-[#e6f4f1]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#2F3E46]">What We Do</h2>
            <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
              A comprehensive platform tailored for every stakeholder in student mental health.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={feature.id}
                  className="bg-white border-2 border-transparent hover:border-[#8DCFB3] transition-all duration-300 shadow-lg cursor-pointer group flex flex-col h-full hover:scale-105"
                  onClick={() => setShowFeatureModal(feature.id)}
                >
                  <CardContent className="p-6 text-center flex flex-col flex-grow">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-gradient-to-br from-[#8DCFB3] via-[#A7D3F3] to-[#C3A7F3] opacity-100 border border-[#A7D3F3] shadow-lg"
                    >
                      <IconComponent className="w-10 h-10" style={{ color: '#222', opacity: 0.85 }} />
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-[#2F3E46]">{feature.title}</h3>
                    <p className="text-gray-500 flex-grow mb-6">{feature.description}</p>
                    <Button
                      variant="link"
                      className="text-[#8DCFB3] font-semibold hover:text-[#A7D3F3]"
                    >
                      Learn More <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
  <section id="about" className="py-20 sm:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-4xl sm:text-5xl font-bold text-[#2F3E46] mb-8">Who We Are</h2>
              <p className="text-lg text-gray-500 mb-6">
                <b>Our mission:</b> to make mental health support stigma-free, accessible, and AI-powered for every student in India.
              </p>
              <ul className="space-y-4 text-lg text-gray-500">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-[#8DCFB3]" />
                  <span>Confidential & Secure</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-[#8DCFB3]" />
                  <span>AI + Human Hybrid Support</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-[#8DCFB3]" />
                  <span>Tailored for Indian Students</span>
                </li>
              </ul>
            </div>
            <div>
              <img
                src="/diverse-students-and-counsellor-in-supportive-envi.jpg"
                alt="Group of students"
                className="rounded-2xl shadow-2xl w-full h-auto max-h-[350px] object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 sm:py-32 bg-[#e6f4f1]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#2F3E46]">What People Are Saying</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="card-hover transition-all duration-500 hover:scale-105"
              >
                <Card className="bg-white p-6 rounded-lg shadow-lg">
                  <p className="text-lg text-gray-500 mb-4">"{testimonial.quote}"</p>
                  <p className="font-bold text-[#2F3E46]">- {testimonial.author}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
  <section id="contact" className="bg-gradient-to-r from-[#ffd166] via-[#e6f4f1] to-white text-[#222] py-20 sm:py-32">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Build a Healthier Campus?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join us in making mental health support stigma-free, accessible, and effective for students across India.
          </p>
          <Button
            size="lg"
            className="text-lg px-10 py-6 bg-white text-[#2F3E46] hover:bg-[#8DCFB3] hover:text-white shadow-lg rounded-full transform hover:scale-105 transition-transform"
            onClick={() => setShowLoginModal(true)}
          >
            🚀 Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
  <footer className="bg-white text-[#222] py-8 border-t border-[#e6f4f1]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-[#8DCFB3] to-[#A7D3F3] rounded-full flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold">Soukhyam</span>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-[#8DCFB3]">About</a>
              <a href="#" className="hover:text-[#8DCFB3]">Contact</a>
              <a href="#" className="hover:text-[#8DCFB3]">Privacy Policy</a>
              <a href="#" className="hover:text-[#8DCFB3]">FAQ</a>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-[#8DCFB3]"><i className="fab fa-linkedin"></i></a>
              <a href="#" className="hover:text-[#8DCFB3]"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-[#8DCFB3]"><i className="fab fa-github"></i></a>
            </div>
          </div>
          <div className="text-center text-gray-400 mt-8">
            <p>&copy; 2025 Soukhyam. All rights reserved.</p>
            <p>Built for SIH 2025 by Team - DG_NeuroForges</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-[#2F3E46]">{t("Welcome to AI Dost")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-6">
            <p className="text-center text-gray-500 mb-6">{t("Choose your role to continue")}</p>
            <div className="space-y-3">
              <Button
                variant="outline"
                size="lg"
                className="w-full justify-start gap-4 h-16 border-gray-200 hover:border-[#8DCFB3] hover:bg-[#8DCFB3]/10 transition-all"
                onClick={() => handleRoleLogin("student")}
              >
                <div className="w-10 h-10 bg-[#8DCFB3]/20 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-[#8DCFB3]" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-[#2F3E46]">{t("Student Login")}</div>
                  <div className="text-sm text-gray-500">Access AI Dost & wellness tools</div>
                </div>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full justify-start gap-4 h-16 border-gray-200 hover:border-[#A7D3F3] hover:bg-[#A7D3F3]/10 transition-all"
                onClick={() => handleRoleLogin("counselor")}
              >
                <div className="w-10 h-10 bg-[#A7D3F3]/20 rounded-full flex items-center justify-center">
                  <Headphones className="w-6 h-6 text-[#A7D3F3]" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-[#2F3E46]">{t("Counsellor Login")}</div>
                  <div className="text-sm text-gray-500">Manage cases & bookings</div>
                </div>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full justify-start gap-4 h-16 border-gray-200 hover:border-[#C3A7F3] hover:bg-[#C3A7F3]/10 transition-all"
                onClick={() => handleRoleLogin("admin")}
              >
                <div className="w-10 h-10 bg-[#C3A7F3]/20 rounded-full flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-[#C3A7F3]" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-[#2F3E46]">{t("Institution Admin")}</div>
                  <div className="text-sm text-gray-500">View analytics & reports</div>
                </div>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full justify-start gap-4 h-16 border-gray-200 hover:border-[#FFD166] hover:bg-[#FFD166]/10 transition-all"
                onClick={() => handleRoleLogin("government")}
              >
                <div className="w-10 h-10 bg-[#FFD166]/20 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#FFD166]" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-[#2F3E46]">{t("Government Login")}</div>
                  <div className="text-sm text-gray-500">Access state-level dashboards</div>
                </div>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Feature Detail Modal */}
      <Dialog open={!!showFeatureModal} onOpenChange={() => setShowFeatureModal(null)}>
        <DialogContent className="sm:max-w-lg bg-white">
          {showFeatureModal && features.find((f) => f.id === showFeatureModal) && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-[#2F3E46]">
                  {features.find((f) => f.id === showFeatureModal)?.title}
                </DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p className="text-gray-500 leading-relaxed">
                  {features.find((f) => f.id === showFeatureModal)?.details}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

const CheckCircle = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);