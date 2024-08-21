import {beforeEach, describe, expect, it, vi} from 'vitest'
import {getCookingList, getCookingTypeList} from './useCookingList'
import {getFromLocalStorage, setDataToLocalStorage} from "@/lib/storage.ts";

vi.mock('@/lib/storage', () => ({
  getFromLocalStorage: vi.fn(),
  setDataToLocalStorage: vi.fn(),
}))

describe('getCookingList', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns cooking list from localStorage if data exists', () => {
    const mockData = [{ name: 'Grill' }]
    vi.mocked(getFromLocalStorage).mockReturnValue(mockData)
    const result = getCookingList()
    expect(result).toEqual(mockData)
  })

  it('returns empty array and sets empty array to localStorage if no data exists', () => {
    vi.mocked(getFromLocalStorage).mockReturnValue(null)
    const result = getCookingList()
    expect(result).toEqual([])
    expect(setDataToLocalStorage).toHaveBeenCalledWith('cuissons', [])
  })
})

describe('getCookingTypeList', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns cooking type list from cooking list', () => {
    const mockData = [{ name: 'Grill' }, { name: 'Bake' }]
    vi.mocked(getFromLocalStorage).mockReturnValue(mockData)
    const result = getCookingTypeList()
    expect(result).toEqual(['Grill', 'Bake'])
  })

  it('returns empty array if cooking list is empty', () => {
    vi.mocked(getFromLocalStorage).mockReturnValue([])
    const result = getCookingTypeList()
    expect(result).toEqual([])
  })
})
