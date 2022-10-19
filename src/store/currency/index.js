import {configureStore} from "@reduxjs/toolkit";
import {currencyApi} from "./currency.api";
import favReducer from './favSlice'
import userReducer from "./userSlice";
import currentCurrency from './currentCurrency'
import rateCurrency from "./rateCurrency";

export const store = configureStore({
    reducer: {
        [currencyApi.reducerPath]: currencyApi.reducer,
        fav: favReducer,
        user: userReducer,
        currentCurrency: currentCurrency,
        rateCurrency: rateCurrency
    },
    middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(currencyApi.middleware)
})





