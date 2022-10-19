import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {Navigate} from "react-router-dom";
import {useGetCurrencyQuery, useLazyGetCurrencyYesterdayQuery} from "../store/currency/currency.api";
import {useAuth} from '../hooks/use-auth'
import {useCurrentUser} from "../hooks/use-currentUser";
import {getDatabase, ref, remove, set} from "firebase/database";
import {useSetFav} from "../hooks/use-setFav";
import {useDateTransform} from "../hooks/use-dateTransform";
import {setCurrentCurrency} from "../store/currency/currentCurrency";
import {setRateCurrency} from "../store/currency/rateCurrency";
import Navigation from "../components/Navigation";
import styles from './HomePage.module.css'

const HomePage = () => {
    const {isLoading, data = []} = useGetCurrencyQuery()
    const {isAuth} = useAuth()
    const [currentCurrency, setCurrentCurrencyLocal] = useState('')
    const [yesterdayCurrency, setYesterdayCurrency] = useState(currentCurrency)
    const [weekAgoCurrency, setWeekAgoCurrency] = useState(currentCurrency)
    const [query, setQuery] = useState('redux');
    const dispatch = useDispatch()
    const currentUser = useCurrentUser()
    const isSetFav = useSetFav(currentCurrency)
    const db = getDatabase();
    const path = `users/${currentUser}/favourites/${currentCurrency.cc}`
    const [fetchCurr, { isLoading: areYesterdayLoading, data: yestarday}] = useLazyGetCurrencyYesterdayQuery()
    const dayMs = 86400000
    const weekMs = 86400000 * 7
    const yesterday = useDateTransform(dayMs)
    const weekAgo = useDateTransform(weekMs)

    useEffect(() => {
        dispatch(setRateCurrency(data))
    }, [isLoading])

    const setCurrency = async (e) => {
        setCurrentCurrencyLocal(data.find(item => item.txt === e.target.value))

        const curr = data.find(item => item.txt === e.target.value)
        const bodyYesterday = {
            curr: curr.cc,
            date: yesterday
        }
        const bodyWeekAgo = {
            curr: curr.cc,
            date: weekAgo
        }
        const respYesterday = await fetchCurr(bodyYesterday)
        const respWeekAgo = await fetchCurr(bodyWeekAgo)

        setYesterdayCurrency(respYesterday.data[0].rate)
        setWeekAgoCurrency(respWeekAgo.data[0].rate)

        dispatch(setCurrentCurrency(currentCurrency))
    }

    const AddToFav = () => {
        set(ref(db, path),
            currentCurrency.cc
        ).then(() => {setQuery(currentCurrency)})
    }

    const deleteFromFav = () => {
        remove(ref(db, path)).then(() => {setQuery(currentCurrency.txt)})
    }

    useEffect(() => {

    }, [query])

    return (
        isAuth ? (
        <div>
            <Navigation/>
            {isLoading && <h2 className="text-center">Loading...</h2>}
            <select onChange={setCurrency} className='text-center'>
                <option disabled={true} selected={true}>Choose currency</option>
                {data.map(item => <option
                    key={item.r030}
                    // value={item}
                >
                    {item.txt}</option>)}
            </select>

            {!isSetFav && currentCurrency && <button className={styles.addButton}
                onClick={AddToFav}
            >Add</button>}

            {isSetFav && <button className={styles.removeButton}
                onClick={deleteFromFav}
            >Remove</button>
            }
            {currentCurrency && <div
                className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">

                <div
                    className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
                    <div className="mx-auto max-w-md">
                        <div className="divide-y divide-gray-300/50">
                            <div className="space-y-6 py-8 text-base leading-7 text-gray-600">
                                <ul className="space-y-4">
                                    <li className="flex items-center">
                                        <img src="https://cdn-icons-png.flaticon.com/512/893/893336.png" alt="" className="h-6"/>
                                        <p className="ml-4">Currency index: <strong>{currentCurrency.cc}</strong></p>
                                    </li>
                                    <li className="flex items-center">

                                        <img src="https://cdn-icons-png.flaticon.com/512/1/1437.png" alt="" className="h-6"/>
                                        <p className="ml-4">
                                            Currency exchange rate against UAH: <strong>{currentCurrency.rate}</strong>
                                        </p>
                                    </li>
                                    <li className="flex items-center">
                                        <img src="https://cdn-icons-png.flaticon.com/512/2672/2672219.png" alt="" className="h-6"/>
                                        <p className="ml-4">Currency exchange date: <strong>{currentCurrency.exchangedate}</strong></p>
                                    </li>
                                </ul>
                            </div>
                            <div className="pt-8 text-base font-semibold leading-7">

                                <ul className="space-y-4">
                                    <li className="flex items-center">
                                        <p className="ml-4">Yesterday {yesterdayCurrency} <span className="ml-40">{(currentCurrency.rate - yesterdayCurrency).toFixed(5)}</span></p>
                                        {(currentCurrency.rate - yesterdayCurrency) === 0 ?
                                            <img src="https://cdn-icons-png.flaticon.com/512/1828/1828779.png" alt="" className="h-6  ml-2"/> :
                                            (currentCurrency.rate - yesterdayCurrency) > 0 ?
                                            <img src="https://cdn-icons-png.flaticon.com/512/3148/3148312.png" alt="" className="h-6  ml-2"/> :
                                            <img src="https://cdn-icons-png.flaticon.com/512/3148/3148295.png" alt="" className="h-6"/>
                                        }

                                    </li>
                                    <li className="flex items-center">
                                        <p className="ml-4">Week ago {weekAgoCurrency} <span className="ml-40">{(currentCurrency.rate - weekAgoCurrency).toFixed(5)}</span></p>
                                        {(currentCurrency.rate - weekAgoCurrency) === 0 ?
                                            <img src="https://cdn-icons-png.flaticon.com/512/1828/1828779.png" alt="" className="h-6  ml-2"/> :
                                            (currentCurrency.rate - weekAgoCurrency) > 0 ?
                                                <img src="https://cdn-icons-png.flaticon.com/512/3148/3148312.png" alt="" className="h-6 ml-2"/> :
                                                <img src="https://cdn-icons-png.flaticon.com/512/3148/3148295.png" alt="" className="h-6 ml-2"/>
                                        }
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            }

        </div>) : (
            <Navigate to='/login'/>
        )
    );
};

export default HomePage;