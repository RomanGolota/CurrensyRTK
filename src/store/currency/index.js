import {configureStore} from "@reduxjs/toolkit";
import {currencyApi} from "./currency.api";
import favReducer from './favSlice'

export const store = configureStore({
    reducer: {
        [currencyApi.reducerPath]: currencyApi.reducer,
        fav: favReducer
    },
    middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(currencyApi.middleware)
})





