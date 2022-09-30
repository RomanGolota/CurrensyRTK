import {createSlice} from "@reduxjs/toolkit";

const FAV_KEY = 'cfk'

const favSlice = createSlice({
    name: 'fav',
    initialState: {
        fav: JSON.parse(localStorage.getItem(FAV_KEY) ?? '[]')
    },
    reducers: {
        addToFav(state, action) {
            state.fav.push(action.payload)
            localStorage.setItem(FAV_KEY, JSON.stringify(state.fav))
        },
        deleteFav(state, action) {
            state.fav = state.fav.filter(item => item.txt !== action.payload)
            localStorage.setItem(FAV_KEY, JSON.stringify(state.fav))
        }
    }
})

export const {addToFav, deleteFav}  = favSlice.actions
export default favSlice.reducer
