'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Type definitions for settings
export type TimeFormat = '12h' | '24h'
export type WeekStartDay = 0 | 1 // 0 = Sunday, 1 = Monday
export type EventCategory = 'work' | 'personal' | 'health' | 'other'
export type DateFormat = 'MM/dd/yyyy' | 'dd/MM/yyyy' | 'yyyy-MM-dd'

export interface Settings {
  timeFormat: TimeFormat
  weekStartDay: WeekStartDay
  defaultEventCategory: EventCategory
  notifications: boolean
  dateFormat: DateFormat
}

export interface SettingsContextType extends Settings {
  setSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void
  resetSettings: () => void
}

// Default settings
const defaultSettings: Settings = {
  timeFormat: '12h',
  weekStartDay: 0, // Sunday
  defaultEventCategory: 'personal',
  notifications: true,
  dateFormat: 'MM/dd/yyyy'
}

// Create context
const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

// Local storage key
const SETTINGS_STORAGE_KEY = 'date-day-pilot-settings'

// Helper function to safely parse JSON from localStorage
const parseStoredSettings = (stored: string | null): Partial<Settings> => {
  if (!stored) return {}
  
  try {
    const parsed = JSON.parse(stored)
    // Validate that parsed object has expected structure
    if (typeof parsed === 'object' && parsed !== null) {
      return parsed
    }
  } catch (error) {
    console.warn('Failed to parse settings from localStorage:', error)
  }
  
  return {}
}

// Helper function to safely stringify and store settings
const storeSettings = (settings: Settings): void => {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings))
  } catch (error) {
    console.warn('Failed to store settings to localStorage:', error)
  }
}

// Settings Provider component
export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings)

  // Initialize settings from localStorage on mount
  useEffect(() => {
    const storedSettings = parseStoredSettings(localStorage.getItem(SETTINGS_STORAGE_KEY))
    
    // Merge stored settings with defaults to ensure all properties exist
    const mergedSettings: Settings = {
      ...defaultSettings,
      ...storedSettings
    }
    
    setSettings(mergedSettings)
  }, [])

  // Function to update a specific setting
  const setSetting = <K extends keyof Settings>(key: K, value: Settings[K]): void => {
    const newSettings = {
      ...settings,
      [key]: value
    }
    
    setSettings(newSettings)
    storeSettings(newSettings)
  }

  // Function to reset all settings to defaults
  const resetSettings = (): void => {
    setSettings(defaultSettings)
    storeSettings(defaultSettings)
  }

  const contextValue: SettingsContextType = {
    ...settings,
    setSetting,
    resetSettings
  }

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  )
}

// Custom hook to use settings context
export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext)
  
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  
  return context
}

// Export default settings for use in other components if needed
export { defaultSettings }