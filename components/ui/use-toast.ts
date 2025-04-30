"use client"

import type React from "react"

// Hooks/use-toast.ts
import { useState } from "react"

type ToastProps = {
  id: string
  title: string
  description?: string
  variant?: "default" | "destructive" | "success"
  action?: React.ReactNode
}

type ToastOptions = Omit<ToastProps, "id">

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = (options: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { id, ...options }

    setToasts((prevToasts) => [...prevToasts, newToast])

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
    }, 5000)
  }

  const dismiss = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }

  return {
    toast,
    dismiss,
    toasts,
  }
}

export type { ToastProps }
