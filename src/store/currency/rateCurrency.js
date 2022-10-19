import {createSlice} from "@reduxjs/toolkit";

const rateCurrencySlice = createSlice({
    name: 'rate',
    initialState: {
        rateCurrency: []
    },
    reducers: {
        setRateCurrency(state, action) {
            console.log(action.payload)
            state.rateCurrency =  action.payload
        },
    }
})

export const {setRateCurrency}  = rateCurrencySlice.actions
export default rateCurrencySlice.reducer