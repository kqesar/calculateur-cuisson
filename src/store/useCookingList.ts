import { create } from 'zustand'
import { ICooking } from '../interfaces'
import { getFromLocalStorage, setDataToLocalStorage } from '../lib/storage'

interface ICookingListState {
  cookingList: ICooking[],
  cookingTypeList: string[],
  deleteCooking: (index: number) => void,
  getCookingList: () => void,
  getCookingTypeList: () => void,
  createCookingType: (cooking: ICooking) => void,
  updateCooking: ({ cuisson, index }: { cuisson: ICooking, index: number }) => void,
  resetCookingList: () => void
}

const defaultCuisson: ICooking[] = [
  {
    // Duration in minutes
    duration: 50,
    // Weight in kilo
    weight: 1,
    name: 'Poulet'
  },
  {
    // Duration in minutes
    duration: 60,
    // Weight in kilo
    weight: 1,
    name: 'Porc'
  }
]

const getCookingListFromStorage = (): ICooking[] => {
  const cuissons = getFromLocalStorage<ICooking[]>("cuissons")
  if (cuissons) {
    return cuissons
  }
  setDataToLocalStorage("cuissons", defaultCuisson)
  return defaultCuisson
}

const getCookingTypeListFromStorage = (cookingList: ICooking[]): string[] => {
  const cookingTypeList: string[] = []
  cookingList.forEach(cuisson => {
    cookingTypeList.push(cuisson.name)
  })
  return cookingTypeList
}

export const useCookingList = create<ICookingListState>((set) => ({
  cookingList: [],
  cookingTypeList: [],
  deleteCooking: (index: number) => set((state) => {
    state.cookingList.splice(index)
    setDataToLocalStorage('cuissons', state.cookingList)
    return {
      cookingList: getCookingListFromStorage(),
      cookingTypeList: getCookingTypeListFromStorage(state.cookingList)
    }
  }),
  getCookingList: () => set((state) => {
    return {
      cookingList: getCookingListFromStorage(),
      cookingTypeList: getCookingTypeListFromStorage(state.cookingList),
    }
  }),
  getCookingTypeList: () => set((state) => ({
    cookingTypeList: getCookingTypeListFromStorage(state.cookingList)
  })),
  createCookingType: (cooking: ICooking) => set((state) => {
    state.cookingList.push(cooking)
    state.cookingTypeList.push(cooking.name)
    setDataToLocalStorage('cuissons', state.cookingList)
    return {
      cookingList: state.cookingList,
      cookingTypeList: state.cookingTypeList
    }
  }),
  updateCooking: ({ cuisson, index }: { cuisson: ICooking, index: number }) => set((state) => {
    state.cookingList[index] = cuisson
    setDataToLocalStorage('cuissons', state.cookingList)
    return {
      cookingList: getCookingListFromStorage(),
      cookingTypeList: getCookingTypeListFromStorage(state.cookingList)
    }
  }),
  resetCookingList: () => set((state) => {
    setDataToLocalStorage('cuissons', defaultCuisson)
    state.cookingList = getCookingListFromStorage()
    return {
      cookingList: state.cookingList
    }
  }),
}))
