import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {Navigate} from "react-router-dom";
import {useGetCurrencyQuery} from "../store/currency/currency.api";
import {useAuth} from '../hooks/use-auth'
import {useCurrentUser} from "../hooks/use-currentUser";
import {getDatabase, ref, remove, set} from "firebase/database";
import {useSetFav} from "../hooks/use-setFav";
import {setCurrentCurrency} from "../store/currency/currentCurrency";
import Navigation from "../components/Navigation";
import styles from './HomePage.module.css'

const HomePage = () => {
    const {isLoading, data = []} = useGetCurrencyQuery()
    const {isAuth} = useAuth()
    const [currentCurrency, setCurrentCurrencyLocal] = useState('')
    const [query, setQuery] = useState('redux');
    const dispatch = useDispatch()
    const currentUser = useCurrentUser()
    const isSetFav = useSetFav(currentCurrency)
    const db = getDatabase();
    const path = `users/${currentUser}/favourites/${currentCurrency.cc}`

    const setCurrency = (e) => {
        setCurrentCurrencyLocal(data.find(item => item.txt === e.target.value))
        console.log(currentCurrency)
        dispatch(setCurrentCurrency(currentCurrency))
    }

    const AddToFav = () => {
        set(ref(db, path), {
            currencyName: currentCurrency.txt,
            currencyRate: currentCurrency.rate,
            currencyCC: currentCurrency.cc,
            currencyDate: currentCurrency.exchangedate
        }).then(() => {setQuery(currentCurrency)})
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
                                        <img src="https://cdn-icons-png.flaticon.com/512/893/893336.png" alt="" class="h-6"/>
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
                                <p>Statistic</p>
                                <p>Yesterday</p>
                                <p>7 days ago</p>
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