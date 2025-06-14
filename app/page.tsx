"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { GraduationCap, Users, BookOpen, Award, Mail, Star, ArrowRight, Play, Shield, Zap, Heart } from "lucide-react"

export default function HomePage() {
  const { user, login } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  const handleDemoLogin = async (role: "student" | "faculty" | "admin") => {
    setIsLoading(true)
    try {
      const credentials = {
        student: { email: "student@college.edu", password: "student123" },
        faculty: { email: "faculty@college.edu", password: "faculty123" },
        admin: { email: "admin@college.edu", password: "admin123" },
      }

      await login(credentials[role].email, credentials[role].password)
    } catch (error) {
      console.error("Demo login failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const stats = [
    { label: "Students", value: "2,500", icon: Users, color: "text-blue-600" },
    { label: "Faculty", value: "150", icon: GraduationCap, color: "text-green-600" },
    { label: "Courses", value: "85", icon: BookOpen, color: "text-purple-600" },
    { label: "Departments", value: "12", icon: Award, color: "text-orange-600" },
  ]

  const features = [
    {
      icon: Shield,
      title: "Secure Authentication",
      description: "Role-based access control with secure login system",
      color: "text-blue-600",
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Live notifications and instant data synchronization",
      color: "text-yellow-600",
    },
    {
      icon: Heart,
      title: "User-Friendly",
      description: "Intuitive interface designed for all user types",
      color: "text-red-600",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Computer Science Student",
      content: "The platform makes it so easy to track my assignments and grades. Love the clean interface!",
      rating: 5,
    },
    {
      name: "Dr. Michael Chen",
      role: "Professor, Mathematics",
      content: "Managing my courses and student interactions has never been this efficient.",
      rating: 5,
    },
    {
      name: "Emily Davis",
      role: "Admin Staff",
      content: "The comprehensive dashboard gives me complete control over college operations.",
      rating: 5,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AryanApp
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => router.push("/login")}>
                Login
              </Button>
              <Button onClick={() => router.push("/register")}>Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={itemVariants} className="text-center lg:text-left">
                <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Modern College
                  </span>
                  <br />
                  <span className="text-gray-900">Management System</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Streamline your educational institution with our comprehensive platform. Manage students, faculty, and
                  courses with ease.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" className="text-lg px-8 py-3" onClick={() => router.push("/register")}>
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                    <Play className="mr-2 h-5 w-5" />
                    Watch Demo
                  </Button>
                </div>
              </motion.div>

              <motion.div variants={floatingVariants} animate="animate" className="relative">
                <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Live Demo
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-center">Try Demo Accounts</h3>
                  <div className="space-y-4">
                    <Button
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                      size="lg"
                      onClick={() => handleDemoLogin("student")}
                      disabled={isLoading}
                    >
                      <Users className="mr-2 h-5 w-5" />
                      {isLoading ? "Loading..." : "Login as Student"}
                    </Button>
                    <Button
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                      size="lg"
                      onClick={() => handleDemoLogin("faculty")}
                      disabled={isLoading}
                    >
                      <GraduationCap className="mr-2 h-5 w-5" />
                      {isLoading ? "Loading..." : "Login as Faculty"}
                    </Button>
                    <Button
                      className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                      size="lg"
                      onClick={() => handleDemoLogin("admin")}
                      disabled={isLoading}
                    >
                      <Shield className="mr-2 h-5 w-5" />
                      {isLoading ? "Loading..." : "Login as Admin"}
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 text-center mt-4">No registration required • Instant access</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Background Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse" />
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse" />
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-200 rounded-full opacity-20 animate-pulse" />
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Educational Institutions</h2>
              <p className="text-lg text-gray-600">Join thousands of schools and colleges using our platform</p>
            </motion.div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <stat.icon className={`h-12 w-12 mx-auto mb-4 ${stat.color}`} />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose EduManage?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our platform combines powerful features with intuitive design to create the perfect educational
                management solution.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className={`inline-flex p-4 rounded-full bg-gray-50 mb-6`}>
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
              <p className="text-xl text-gray-600">Hear from students, faculty, and administrators</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  variants={itemVariants}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    {Array.from({ length: testimonial.rating }, (_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Institution?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of educational institutions already using EduManage to streamline their operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-3"
                  onClick={() => router.push("/register")}
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Contact Sales
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="h-8 w-8 text-blue-400" />
                  <span className="text-xl font-bold">AryanApp</span>
                </div>
                <p className="text-gray-400 mb-4">Modern college management system designed for the digital age.</p>
                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-400">contact@edumanage.com</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Product</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>Features</li>
                  <li>Pricing</li>
                  <li>Security</li>
                  <li>Updates</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>Documentation</li>
                  <li>Help Center</li>
                  <li>Contact Us</li>
                  <li>Status</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>About</li>
                  <li>Blog</li>
                  <li>Careers</li>
                  <li>Privacy</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 AryanApp. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </motion.div>
    </div>
  )
}
