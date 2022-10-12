import {createSlice} from "@reduxjs/toolkit";
import {getDatabase, ref, update} from "firebase/database";
import {getUserName} from "../../helpers/helpers";

const initialState = {
    email: null,
    token: null,
    id: null,
    currentUser: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            const db = getDatabase()
            state.email = action.payload.email
            state.token = action.payload.token
            state.id = action.payload.id
            state.currentUser = getUserName(action.payload.email)
        },
        removeUser(state) {
            state.email = null
            state.token = null
            state.id = null
            state.currentUser = null
        }
    }
})

export const {setUser, removeUser} = userSlice.actions

export default userSlice.reducer
