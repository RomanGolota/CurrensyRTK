import {configureStore} from "@reduxjs/toolkit";
import {currencyApi} from "./currency.api";
import favReducer from './favSlice'
import userReducer from "./userSlice";

export const store = configureStore({
    reducer: {
        [currencyApi.reducerPath]: currencyApi.reducer,
        fav: favReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(currencyApi.middleware)
})





