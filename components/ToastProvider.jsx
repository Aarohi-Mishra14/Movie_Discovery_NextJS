'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import './ToastProvider.css'

const ToastContext = createContext(null)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export default function ToastProvider({ children }) {
  const [message, setMessage] = useState('')

  const showToast = useCallback((text) => {
    setMessage(text)
  }, [])

  useEffect(() => {
    if (!message) return
    const timer = setTimeout(() => setMessage(''), 2200)
    return () => clearTimeout(timer)
  }, [message])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {message && (
        <div className="toast" role="status">
          <Check size={16} strokeWidth={2.5} />
          <span>{message}</span>
        </div>
      )}
    </ToastContext.Provider>
  )
}
