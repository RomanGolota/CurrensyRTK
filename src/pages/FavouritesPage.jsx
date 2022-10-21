import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import {useFavourites} from "../hooks/use-favourites"
import {getDatabase, ref, remove} from "firebase/database";
import {useCurrentUser} from "../hooks/use-currentUser";
import Navigation from "../components/Navigation"
import styles from './FavouritesPage.module.css'
import {useLazyGetCurrencyYesterdayQuery} from "../store/currency/currency.api";
import {useDateTransform} from "../hooks/use-dateTransform";
import StatisticForm from "../components/StatisticForm";

const FavouritesPage = () => {
    const rateCurrency = useSelector(state => state.rateCurrency.rateCurrency)
    const [query, setQuery] = useState('redux');
    const [currentCurr, setCurr] = useState('');
    const [yesterdayCurrency, setYesterdayCurrency] = useState('')
    const [weekAgoCurrency, setWeekAgoCurrency] = useState('')
    const favourites = useFavourites()
    const currentUser = useCurrentUser()
    const favouritesToMap = rateCurrency.filter(item => favourites.includes(item.cc))
    const db = getDatabase()
    const [fetchCurr, { isLoading: areYesterdayLoading, data: yestarday}] = useLazyGetCurrencyYesterdayQuery()
    const dayMs = 86400000
    const weekMs = 86400000 * 7
    const yesterday = useDateTransform(dayMs)
    const weekAgo = useDateTransform(weekMs)

    const removeFromFav = (e) => {
        const deletedCurrency = (e.target.parentElement.innerText).split('').splice(0, 3).join('')
        remove(ref(db, `users/${currentUser}/favourites/${deletedCurrency}`)).then(() => {setQuery(deletedCurrency)})
    }

    useEffect(() => {

    }, [query])

    const setStatisticData = async (e) => {
        setCurr(e)

        const bodyYesterday = {
            curr: e.cc,
            date: yesterday
        }
        const bodyWeekAgo = {
            curr: e.cc,
            date: weekAgo
        }

        const respYesterday = await fetchCurr(bodyYesterday)
        const respWeekAgo = await fetchCurr(bodyWeekAgo)

        setYesterdayCurrency(respYesterday.data[0].rate)
        setWeekAgoCurrency(respWeekAgo.data[0].rate)

    }

    return (
        <div>
            <Navigation/>
            {favouritesToMap.map(i => <div key={Date.now() + i.cc} className={styles.favElem} onClick={() => setStatisticData(i)}>
                <span className="mx-1">{i.cc}</span>
                <span className="mx-1">{i.txt}</span>

                <button className={styles.deleteButton} onClick={removeFromFav}>
                    Delete
                </button>
                </div>)
            }
                {currentCurr &&
                    <div
                        className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
                        <StatisticForm currentCurr={currentCurr} weekAgoCurrency={weekAgoCurrency} yesterdayCurrency={yesterdayCurrency}/>
                    </div>
                }
        </div>
    );
};

export default FavouritesPage;