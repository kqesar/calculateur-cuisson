import {defineStore} from "pinia";
import {ref} from "vue";
import {ICooking} from "@/interfaces";

export const useCookingList = defineStore('cookingList', () => {
    const cookingList = ref<ICooking[]>([])
    const cookingTypeList = ref<string[]>([])

    const createCookingType = (newCookingType: ICooking) => {
        cookingList.value.push(newCookingType)
        cookingTypeList.value.push(newCookingType.name)
        localStorage.setItem('cuissons', JSON.stringify(cookingList.value))
    }

    const getCookingList = () => {
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
        cookingList.value = cuissons
        getCookingTypeList()
    }

    const getCookingTypeList = () => {
        cookingTypeList.value = []
        cookingList.value.forEach(cuisson => {
            cookingTypeList.value.push(cuisson.name)
        })
    }

    const updateCooking = (cuisson: ICooking, index: number) => {
        cookingList.value[index] = cuisson
        localStorage.setItem('cuissons', JSON.stringify(cookingList.value))
        getCookingList()
    }
    const deleteCooking = (index: number) => {
        cookingList.value.splice(index)
        localStorage.setItem('cuissons', JSON.stringify(cookingList.value))
        getCookingList()
    }

    const resetCookingList = () => {
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
        getCookingList()
    }

    return {
        cookingList, resetCookingList, createCookingType, getCuissonList: getCookingList, cookingTypeList, updateCooking, deleteCooking
    }
})