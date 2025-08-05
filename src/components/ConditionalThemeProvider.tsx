'use client'

import { usePathname } from 'next/navigation'
import React from 'react'
import { ThemeProvider, ThemeContext } from '@/contexts/ThemeContext'

interface ConditionalThemeProviderProps {
  children: React.ReactNode
}

const ThemedWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const context = React.useContext(ThemeContext)
  
  if (!context) {
    return <>{children}</>
  }
  
  const { theme } = context
  
  // Apply dark class and background to html/body elements for global dark mode
  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      document.body.style.backgroundColor = '#111827'
      document.body.style.color = '#f9fafb'
    } else {
      document.documentElement.classList.remove('dark')
      document.body.style.backgroundColor = ''
      document.body.style.color = ''
    }
    
    // Cleanup on unmount
    return () => {
      document.documentElement.classList.remove('dark')
      document.body.style.backgroundColor = ''
      document.body.style.color = ''
    }
  }, [theme])
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} transition-colors duration-300`}>
      {children}
    </div>
  )
}

const ConditionalThemeProvider: React.FC<ConditionalThemeProviderProps> = ({ children }) => {
  const pathname = usePathname()
  
  // Only apply theme provider to dashboard and notebook pages
  const shouldApplyTheme = pathname?.startsWith('/dashboard') || pathname?.startsWith('/notebook')
  
  if (shouldApplyTheme) {
    return (
      <ThemeProvider>
        <ThemedWrapper>
          {children}
        </ThemedWrapper>
      </ThemeProvider>
    )
  }
  
  return <>{children}</>
}

export default ConditionalThemeProvider