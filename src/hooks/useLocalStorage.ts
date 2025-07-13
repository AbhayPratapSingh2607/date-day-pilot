import { useState, useEffect, useCallback } from 'react'

/**
 * Custom hook for localStorage persistence with TypeScript generics
 * @param key - The localStorage key
 * @param defaultValue - The default value to use if no stored value exists
 * @returns A tuple of [value, setValue] similar to useState
 */
export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (value: T | ((prevValue: T) => T)) => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      
      // Parse stored json or if none return defaultValue
      if (item === null) {
        return defaultValue
      }
      
      return JSON.parse(item)
    } catch (error) {
      // If error also return defaultValue
      console.warn(`Error reading localStorage key "${key}":`, error)
      return defaultValue
    }
  })

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback(
    (value: T | ((prevValue: T) => T)) => {
      try {
        // Allow value to be a function so we have the same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value
        
        // Save state
        setStoredValue(valueToStore)
        
        // Save to local storage
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore))
        }
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.error(`Error setting localStorage key "${key}":`, error)
      }
    },
    [key, storedValue]
  )

  // Listen for changes to localStorage from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          const newValue = JSON.parse(e.newValue)
          setStoredValue(newValue)
        } catch (error) {
          console.warn(`Error parsing localStorage change for key "${key}":`, error)
        }
      }
    }

    // Listen for storage events
    window.addEventListener('storage', handleStorageChange)

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [key])

  return [storedValue, setValue]
}

/**
 * Helper function to safely get a value from localStorage
 * @param key - The localStorage key
 * @param defaultValue - The default value to return if key doesn't exist or parsing fails
 * @returns The parsed value or defaultValue
 */
export function getLocalStorageValue<T>(key: string, defaultValue: T): T {
  try {
    const item = window.localStorage.getItem(key)
    
    if (item === null) {
      return defaultValue
    }
    
    return JSON.parse(item)
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error)
    return defaultValue
  }
}

/**
 * Helper function to safely set a value in localStorage
 * @param key - The localStorage key
 * @param value - The value to store
 * @returns true if successful, false otherwise
 */
export function setLocalStorageValue<T>(key: string, value: T): boolean {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(value))
      return true
    }
    return false
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error)
    return false
  }
}

/**
 * Helper function to safely remove a value from localStorage
 * @param key - The localStorage key to remove
 * @returns true if successful, false otherwise
 */
export function removeLocalStorageValue(key: string): boolean {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key)
      return true
    }
    return false
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error)
    return false
  }
}

/**
 * Helper function to check if localStorage is available
 * @returns true if localStorage is available, false otherwise
 */
export function isLocalStorageAvailable(): boolean {
  try {
    if (typeof window === 'undefined') {
      return false
    }
    
    const testKey = '__localStorage_test__'
    window.localStorage.setItem(testKey, 'test')
    window.localStorage.removeItem(testKey)
    return true
  } catch (error) {
    return false
  }
}