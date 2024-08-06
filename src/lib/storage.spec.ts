import { describe, beforeEach, it, expect, vi } from 'vitest'
import { getFromLocalStorage, setDataToLocalStorage } from './storage'

describe('localStorage functions', () => {
  beforeEach(() => {
    const localStorageMock = (() => {
      let store: Record<string, string> = {}
      return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => store[key] = value,
        clear: () => store = {},
        removeItem: (key: string) => delete store[key]
      }
    })()
    vi.stubGlobal('localStorage', localStorageMock)
    localStorage.clear()
  })

  it('returns null when key does not exist in localStorage', () => {
    const result = getFromLocalStorage('nonexistentKey')
    expect(result).toBeNull()
  })

  it('returns parsed data when key exists in localStorage', () => {
    const key = 'existingKey'
    const data = { field: 'value' }
    localStorage.setItem(key, JSON.stringify(data))

    const result = getFromLocalStorage(key)
    expect(result).toEqual(data)
  })

  it('sets data to localStorage correctly', () => {
    const key = 'key'
    const data = { field: 'value' }

    setDataToLocalStorage(key, data)
    const storedData = JSON.parse(localStorage.getItem(key) as string)
    expect(storedData).toEqual(data)
  })

  it('overwrites existing data in localStorage', () => {
    const key = 'key'
    const initialData = { field: 'initialValue' }
    const newData = { field: 'newValue' }
    localStorage.setItem(key, JSON.stringify(initialData))

    setDataToLocalStorage(key, newData)
    const storedData = JSON.parse(localStorage.getItem(key) as string)
    expect(storedData).toEqual(newData)
  })

  it('handles non-JSON data in localStorage gracefully', () => {
    const key = 'key'
    localStorage.setItem(key, 'non-json-data')

    const result = getFromLocalStorage(key)
    expect(result).toBeNull()
  })
})
