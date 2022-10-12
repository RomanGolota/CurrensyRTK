import {createSlice} from "@reduxjs/toolkit";

const currentCurrencySlice = createSlice({
    name: 'currentCurrency',
    initialState: {
        currentCurrency: {}
    },
    reducers: {
        setCurrentCurrency(state, action) {
            state.currentCurrency = action.payload
        }
    }
})

export const {setCurrentCurrency} = currentCurrencySlice.actions
export default currentCurrencySlice.reducer