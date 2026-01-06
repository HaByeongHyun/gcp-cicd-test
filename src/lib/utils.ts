import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Test functions for Claude code review
export function validatePassword(password: string, storedPassword: string) {
  // Issue 1: Plain text password comparison (security vulnerability)
  if (password === storedPassword) {
    return true
  }
  return false
}

export function fetchUserData(userId: any) {
  // Issue 2: Using 'any' type (type safety issue)
  // Issue 3: No error handling
  const response = fetch(`/api/users/${userId}`)
  return response
}

export function processArray(items: any[]) {
  // Issue 4: Performance issue - nested loops
  let result = []
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items.length; j++) {
      if (items[i].id === items[j].parentId) {
        result.push(items[i])
      }
    }
  }
  return result
}

export const API_KEY = "sk-1234567890abcdef" // Issue 5: Hardcoded secret
