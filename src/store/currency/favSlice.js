import {createSlice} from "@reduxjs/toolkit";

const favSlice = createSlice({
    name: 'fav',
    initialState: {
        fav: []
    },
    reducers: {
        addToFav(state, action) {
            state.fav.push(action.payload)
        },
        deleteFav(state, action) {
            state.fav = state.fav.filter(item => item.txt !== action.payload)
        }
    }
})

export const {addToFav, deleteFav}  = favSlice.actions
export default favSlice.reducer
