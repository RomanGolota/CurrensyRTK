import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import {useFavourites} from "../hooks/use-favourites"
import {getDatabase, ref, remove} from "firebase/database";
import {useCurrentUser} from "../hooks/use-currentUser";
import Navigation from "../components/Navigation"
import styles from './FavouritesPage.module.css'
import {useLazyGetCurrencyYesterdayQuery} from "../store/currency/currency.api";
import {useDateTransform} from "../hooks/use-dateTransform";

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
        console.log(deletedCurrency)
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
                <span>{i.currencyName}</span>

                <button
                     className={styles.deleteButton}
                     onClick={removeFromFav}
                >
                    Delete
                </button>
                </div>)
            }
                {currentCurr &&
                    <div
                        className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">

                        <div
                            className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
                            <div className="mx-auto max-w-md">
                                <div className="divide-y divide-gray-300/50">
                                    <div className="space-y-6 py-8 text-base leading-7 text-gray-600">
                                        <ul className="space-y-4">
                                            <li className="flex items-center">
                                                <img src="https://cdn-icons-png.flaticon.com/512/893/893336.png" alt=""
                                                     className="h-6"/>
                                                <p className="ml-4">Currency index: <strong>{currentCurr.cc}</strong></p>
                                            </li>
                                            <li className="flex items-center">

                                                <img src="https://cdn-icons-png.flaticon.com/512/1/1437.png" alt=""
                                                     className="h-6"/>
                                                <p className="ml-4">
                                                    Currency exchange rate against UAH: <strong>{currentCurr.rate}</strong>
                                                </p>
                                            </li>
                                            <li className="flex items-center">
                                                <img src="https://cdn-icons-png.flaticon.com/512/2672/2672219.png" alt=""
                                                     className="h-6"/>
                                                <p className="ml-4">Currency exchange
                                                    date: <strong>{currentCurr.exchangedate}</strong></p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="pt-8 text-base font-semibold leading-7">
                                        <ul className="space-y-4">
                                            <li className="flex items-center">
                                                <p className="ml-4">Yesterday {yesterdayCurrency}<span
                                                    className="ml-40">{(currentCurr.rate - yesterdayCurrency).toFixed(5)}</span>
                                                </p>
                                                {(currentCurr.rate - yesterdayCurrency) === 0 ?
                                                    <img src="https://cdn-icons-png.flaticon.com/512/1828/1828779.png"
                                                         alt="" className="h-6  ml-2"/> :
                                                    (currentCurr.rate - yesterdayCurrency) > 0 ?
                                                        <img src="https://cdn-icons-png.flaticon.com/512/3148/3148312.png"
                                                             alt="" className="h-6  ml-2"/> :
                                                        <img src="https://cdn-icons-png.flaticon.com/512/3148/3148295.png"
                                                             alt="" className="h-6"/>
                                                }

                                            </li>
                                            <li className="flex items-center">
                                                <p className="ml-4">Week ago {weekAgoCurrency}<span
                                                    className="ml-40">{(currentCurr.rate - weekAgoCurrency).toFixed(5)}</span>
                                                </p>
                                                {(currentCurr.rate - weekAgoCurrency) === 0 ?
                                                    <img src="https://cdn-icons-png.flaticon.com/512/1828/1828779.png"
                                                         alt="" className="h-6  ml-2"/> :
                                                    (currentCurr.rate - weekAgoCurrency) > 0 ?
                                                        <img src="https://cdn-icons-png.flaticon.com/512/3148/3148312.png"
                                                             alt="" className="h-6 ml-2"/> :
                                                        <img src="https://cdn-icons-png.flaticon.com/512/3148/3148295.png"
                                                             alt="" className="h-6 ml-2"/>
                                                }
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
        </div>
    );
};

export default FavouritesPage;