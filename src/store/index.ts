import {configureStore} from "@reduxjs/toolkit";
import {cookingListSlice} from "./cookingListSlice.ts";


export const store = configureStore({
    reducer: {
        cookingList: cookingListSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch