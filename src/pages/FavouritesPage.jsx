import React, {useEffect, useState} from 'react'
import {useFavourites} from "../hooks/use-favourites"
import {getDatabase, ref, remove} from "firebase/database";
import {useCurrentUser} from "../hooks/use-currentUser";
import Navigation from "../components/Navigation"
import styles from './FavouritesPage.module.css'
import {useSelector} from "react-redux";

const FavouritesPage = () => {
    const rateCurrency = useSelector(state => state.rateCurrency.rateCurrency)
    const [query, setQuery] = useState('redux');
    const [currentCurr, setCurr] = useState({currencyCC: '-', currencyRate: '-', currencyDate: '-'});
    const favourites = useFavourites()
    const currentUser = useCurrentUser()
    const favouritesToMap = rateCurrency.filter(item => favourites.includes(item.cc))
    const db = getDatabase()

    const removeFromFav = (e) => {
        const deletedCurrency = (e.target.parentElement.innerText).split('').splice(0, 3).join('')
        console.log(deletedCurrency)
        remove(ref(db, `users/${currentUser}/favourites/${deletedCurrency}`)).then(() => {setQuery(deletedCurrency)})
    }

    useEffect(() => {

    }, [query])

    return (
        <div>
            <Navigation/>
            {favouritesToMap.map(i => <div key={Date.now() + i.cc} className={styles.favElem} onClick={() => setCurr(i)}>
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
                                <p>Statistic</p>
                                <p>Yesterday</p>
                                <p>7 days ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FavouritesPage;