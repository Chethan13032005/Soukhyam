"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type UserRole = "student" | "counselor" | "admin" | null

interface UserRoleContextType {
  role: UserRole
  setRole: (role: UserRole) => void
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined)

export function UserRoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>(null)

  useEffect(() => {
    // Load role from localStorage on mount
    const savedRole = localStorage.getItem("userRole") as UserRole
    if (savedRole) {
      setRole(savedRole)
    }
  }, [])

  const updateRole = (newRole: UserRole) => {
    setRole(newRole)
    if (newRole) {
      localStorage.setItem("userRole", newRole)
    } else {
      localStorage.removeItem("userRole")
    }
  }

  return <UserRoleContext.Provider value={{ role, setRole: updateRole }}>{children}</UserRoleContext.Provider>
}

export function useUserRole() {
  const context = useContext(UserRoleContext)
  if (context === undefined) {
    throw new Error("useUserRole must be used within a UserRoleProvider")
  }
  return context
}
