"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { GraduationCap, Menu, X, User, Settings, LogOut, Bell, Search } from "lucide-react"
import Link from "next/link"

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "text-red-600"
      case "faculty":
        return "text-green-600"
      case "student":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/profile", label: "Profile" },
    ...(user?.role === "admin"
      ? [
          { href: "/admin/users", label: "Manage Users" },
          { href: "/admin/departments", label: "Departments" },
          { href: "/admin/reports", label: "Reports" },
        ]
      : []),
    ...(user?.role === "faculty"
      ? [
          { href: "/faculty/subjects", label: "My Subjects" },
          { href: "/faculty/attendance", label: "Attendance" },
          { href: "/faculty/assignments", label: "Assignments" },
        ]
      : []),
    ...(user?.role === "student"
      ? [
          { href: "/student/schedule", label: "Schedule" },
          { href: "/student/assignments", label: "Assignments" },
          { href: "/student/marks", label: "Marks" },
        ]
      : []),
  ]

  // Don't render navbar on home page if user is not logged in
  if (!user) {
    return null
  }

  return (
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} className="bg-white shadow-lg border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                <GraduationCap className="h-8 w-8 text-blue-600" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AryanApp
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.slice(0, 3).map((item) => (
              <motion.div key={item.href} whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <Link href={item.href} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Search className="h-5 w-5" />
            </motion.button>

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors relative"
            >
              <Bell className="h-5 w-5" />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"
              />
            </motion.button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.profileData?.profileImage || "/placeholder.svg"} />
                    <AvatarFallback className="bg-blue-600 text-white">
                      {user?.displayName ? user.displayName.charAt(0).toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">{user?.displayName || "User"}</p>
                    <p className={`text-xs ${getRoleColor(user?.role || "")}`}>
                      {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "User"}
                    </p>
                  </div>
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t bg-white"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
