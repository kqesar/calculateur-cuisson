import {ICooking} from '@/interfaces'
import {getFromLocalStorage, setDataToLocalStorage} from '@/lib/storage'

export const getCookingList = (): ICooking[] => {
  const cuissons = getFromLocalStorage<ICooking[]>("cuissons")
  if (cuissons) {
    return cuissons
  }
  setDataToLocalStorage("cuissons", [])
  return []
}

export const getCookingTypeList = (): string[] => {
  const cookingList = getCookingList()
  return cookingList.reduce((all: string[], cuisson) => [...all, cuisson.name], [])
}
