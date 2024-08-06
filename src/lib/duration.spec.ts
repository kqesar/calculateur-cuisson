import { describe, it, expect } from 'vitest'
import { getTextCookingDuration } from './duration'

describe('getTextCookingDuration', () => {
  it('returns formatted duration for valid input', () => {
    const result = getTextCookingDuration(125)
    expect(result).toBe('2 h 5 (125 minutes)')
  })

  it('returns empty string for NaN input', () => {
    const result = getTextCookingDuration(NaN)
    expect(result).toBe('')
  })

  it('returns formatted duration for zero input', () => {
    const result = getTextCookingDuration(0)
    expect(result).toBe('0 h 0 (0 minutes)')
  })

  it('returns formatted duration for less than an hour', () => {
    const result = getTextCookingDuration(45)
    expect(result).toBe('0 h 45 (45 minutes)')
  })

  it('returns formatted duration for exactly one hour', () => {
    const result = getTextCookingDuration(60)
    expect(result).toBe('1 h 0 (60 minutes)')
  })
})
