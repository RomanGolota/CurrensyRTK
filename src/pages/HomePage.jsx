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
import StatisticForm from "../components/StatisticForm";

const HomePage = () => {
    const {isLoading, data = []} = useGetCurrencyQuery()
    const {isAuth} = useAuth()
    const [currentCurr, setCurrentCurrencyLocal] = useState('')
    const [yesterdayCurrency, setYesterdayCurrency] = useState(currentCurr)
    const [weekAgoCurrency, setWeekAgoCurrency] = useState(currentCurr)
    const [query, setQuery] = useState('redux');
    const dispatch = useDispatch()
    const currentUser = useCurrentUser()
    const isSetFav = useSetFav(currentCurr)
    const db = getDatabase();
    const path = `users/${currentUser}/favourites/${currentCurr.cc}`
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

        dispatch(setCurrentCurrency(currentCurr))
    }

    const AddToFav = () => {
        set(ref(db, path),
            currentCurr.cc
        ).then(() => {setQuery(currentCurr)})
    }

    const deleteFromFav = () => {
        remove(ref(db, path)).then(() => {setQuery(currentCurr.txt)})
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
                {data.map(item => <option key={item.r030}>
                    {item.txt}</option>)
                }
            </select>

            {!isSetFav && currentCurr && <button className={styles.addButton}
                onClick={AddToFav}
            >Add</button>}

            {isSetFav && <button className={styles.removeButton}
                onClick={deleteFromFav}
            >Remove</button>
            }

            {currentCurr && <div
                className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
                <StatisticForm currentCurr={currentCurr} weekAgoCurrency={weekAgoCurrency} yesterdayCurrency={yesterdayCurrency}/>
            </div>
            }

        </div>) : (
            <Navigate to='/login'/>
        )
    );
};

export default HomePage;