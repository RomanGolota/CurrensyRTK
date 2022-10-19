import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const currencyApi = createApi({
    reducerPath: 'currency/api',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://bank.gov.ua/"
    }),
    endpoints: build => ({
        getCurrency: build.query({
            query: () => ({
                url: `NBUStatService/v1/statdirectory/exchange`,
                params: {
                    q: 'json'
                }
            })
        }),
        getCurrencyYesterday: build.query({
            query: ( body) => ({
                url: `NBUStatService/v1/statdirectory/exchange?valcode=${body.curr}&date=${body.date}`,
                params: {
                    q: 'json'
                }
            })
        })
    })
})

export const {useGetCurrencyQuery, useLazyGetCurrencyYesterdayQuery} = currencyApi
