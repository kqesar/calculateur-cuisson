import { create } from 'zustand'
import { ICooking } from '@/interfaces'
import { getFromLocalStorage, setDataToLocalStorage } from '@/lib/storage'
import { devtools } from 'zustand/middleware'

interface ICookingListState {
  cookingList: ICooking[],
  cookingTypeList: string[],
  deleteCooking: (index: number) => void,
  getCookingList: () => void,
  getCookingTypeList: () => void,
  createCookingType: (cooking: ICooking) => void,
  updateCooking: ({ cuisson, index }: { cuisson: ICooking, index: number }) => void,
}

const getCookingList = (): ICooking[] => {
  const cuissons = getFromLocalStorage<ICooking[]>("cuissons")
  if (cuissons) {
    return cuissons
  }
  setDataToLocalStorage("cuissons", [])
  return []
}

const getCookingTypeList = (cookingList: ICooking[]): string[] => {
  return cookingList.reduce((all: string[], cuisson) => {
    return [...all, cuisson.name]
  }, [])

}

export const useCookingList = create<ICookingListState>()(devtools((set, get) => ({
  cookingList: [],
  cookingTypeList: [],
  deleteCooking: (index: number) => {
    get().cookingList.splice(index, 1)
    setDataToLocalStorage('cuissons', get().cookingList)
    set(() => {
      return {
        cookingList: [...get().cookingList],
      }
    })
    get().getCookingList()
    get().getCookingTypeList()
  },
  getCookingList: () => set((state) => {
    return {
      cookingList: getCookingList(),
      cookingTypeList: getCookingTypeList(state.cookingList),
    }
  }),
  getCookingTypeList: () => set((state) => ({
    cookingTypeList: getCookingTypeList(state.cookingList)
  })),
  createCookingType: (cooking: ICooking) => {
    set(() => {
      return {
        cookingList: [...get().cookingList, cooking],
      }
    })
    get().getCookingTypeList()
    setDataToLocalStorage('cuissons', get().cookingList)
  },
  updateCooking: ({ cuisson, index }: { cuisson: ICooking, index: number }) => set((state) => {
    state.cookingList[index] = cuisson
    setDataToLocalStorage('cuissons', state.cookingList)
    return {
      cookingList: getCookingList(),
      cookingTypeList: getCookingTypeList(state.cookingList)
    }
  })
})))
