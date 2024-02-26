import { create } from 'zustand'
import { ICooking } from '../interfaces'

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

const getCookingListFromStorage = (): ICooking[] => {
  let cuissons: ICooking[]
  if (!localStorage.getItem('cuissons')) {
    cuissons = [
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
    localStorage.setItem('cuissons', JSON.stringify(cuissons))
  } else {
    cuissons = JSON.parse(localStorage.getItem('cuissons') || '')
  }
  return cuissons
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
    localStorage.setItem('cuissons', JSON.stringify(state.cookingList))
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
    localStorage.setItem('cuissons', JSON.stringify(state.cookingList))
    return {
      cookingList: state.cookingList,
      cookingTypeList: state.cookingTypeList
    }
  }),
  updateCooking: ({ cuisson, index }: { cuisson: ICooking, index: number }) => set((state) => {
    state.cookingList[index] = cuisson
    localStorage.setItem('cuissons', JSON.stringify(state.cookingList))
    return {
      cookingList: getCookingListFromStorage(),
      cookingTypeList: getCookingTypeListFromStorage(state.cookingList)
    }
  }),
  resetCookingList: () => set((state) => {
    const cuissons: ICooking[] = [
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
    localStorage.setItem('cuissons', JSON.stringify(cuissons))
    state.cookingList = getCookingListFromStorage()
    return {
      cookingList: getCookingListFromStorage()
    }
  }),
}))
