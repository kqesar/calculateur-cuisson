import {ICooking} from "../interfaces";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ICookingListState {
    cookingList: ICooking[],
    cookingTypeList: string[]
}

const initialState: ICookingListState = {
    cookingList: [],
    cookingTypeList: []
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

export const cookingListSlice = createSlice({
    name: 'cookingList',
    initialState,
    reducers: {
        createCookingType: (state, action: PayloadAction<ICooking>) => {
            state.cookingList.push(action.payload)
            state.cookingTypeList.push(action.payload.name)
            localStorage.setItem('cuissons', JSON.stringify(state.cookingList))
        },
        updateCooking: (state, action: PayloadAction<{ cuisson: ICooking, index: number }>) => {
            state.cookingList[action.payload.index] = action.payload.cuisson
            localStorage.setItem('cuissons', JSON.stringify(state.cookingList))
            state.cookingList = getCookingListFromStorage()
            state.cookingTypeList = getCookingTypeListFromStorage(state.cookingList)
        },
        deleteCooking: (state, action: PayloadAction<number>) => {
            state.cookingList.splice(action.payload)
            localStorage.setItem('cuissons', JSON.stringify(state.cookingList))
            state.cookingList = getCookingListFromStorage()
            state.cookingTypeList = getCookingTypeListFromStorage(state.cookingList)
        },
        getCookingList: (state) => {
            state.cookingList = getCookingListFromStorage()
            state.cookingTypeList = getCookingTypeListFromStorage(state.cookingList)
        },
        getCookingTypeList: (state) => {
            state.cookingTypeList = getCookingTypeListFromStorage(state.cookingList)
        },
        resetCookingList: (state) => {
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
        }
    }
})

export const {
    resetCookingList,
    createCookingType,
    getCookingList,
    deleteCooking,
    getCookingTypeList,
    updateCooking
} = cookingListSlice.actions
export default cookingListSlice.reducer