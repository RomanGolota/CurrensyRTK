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
        dispatch(setCurrentCurrency(currentCurrency))
    }

    const AddToFav = () => {
        set(ref(db, path), {
            currencyName: currentCurrency.txt,
            currencyRate: currentCurrency.rate,
            currencyCC: currentCurrency.cc
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
            <select onChange={setCurrency}>
                <option>Choose currency</option>
                {data.map(item => <option
                    key={item.r030}
                >
                    {item.txt}</option>)}
            </select>
            <span className="ml-2">{currentCurrency?.rate}</span>

            {!isSetFav && currentCurrency && <button className={styles.addButton}
                onClick={AddToFav}
            >Add</button>}

            {isSetFav && <button className={styles.removeButton}
                onClick={deleteFromFav}
            >Remove</button>
            }
        </div>) : (
            <Navigate to='/login'/>
        )
    );
};

export default HomePage;