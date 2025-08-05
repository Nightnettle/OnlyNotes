'use client'

import { ThemeContext } from '@/contexts/ThemeContext'
import { Moon, Sun } from 'lucide-react'
import React, { useContext } from 'react'
import { Button } from './ui/button'

interface ThemeToggleProps {
  className?: string
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const context = useContext(ThemeContext)
  
  // Don't render if not within ThemeProvider
  if (!context) {
    return null
  }
  
  const { theme, toggleTheme } = context

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className={`relative overflow-hidden rounded-full w-10 h-10 p-0 transition-all duration-300 ${theme === 'light' ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-800 hover:bg-gray-700'} ${className}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-4 h-4">
        <Sun 
          className={`absolute inset-0 w-4 h-4 transition-all duration-300 transform ${
            theme === 'light' 
              ? 'rotate-0 scale-100 opacity-100' 
              : 'rotate-90 scale-0 opacity-0'
          }`}
        />
        <Moon 
          className={`absolute inset-0 w-4 h-4 transition-all duration-300 transform ${
            theme === 'dark' 
              ? 'rotate-0 scale-100 opacity-100' 
              : '-rotate-90 scale-0 opacity-0'
          }`}
        />
      </div>
    </Button>
  )
}

export default ThemeToggle