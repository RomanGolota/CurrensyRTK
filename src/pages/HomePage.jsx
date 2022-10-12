import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {useGetCurrencyQuery} from "../store/currency/currency.api";
import {addToFav, deleteFav} from "../store/currency/favSlice";
import {useAuth} from '../hooks/use-auth'
import {removeUser} from "../store/currency/userSlice";
import {useCurrentUser} from "../hooks/use-currentUser";
import {getDatabase, ref, remove, set} from "firebase/database";
import {useSetFav} from "../hooks/use-setFav";
import {useFavourites} from "../hooks/use-favourites"
import {setCurrentCurrency} from "../store/currency/currentCurrency";
import Navigation from "../components/Navigation";
import styles from './HomePage.module.css'

const HomePage = () => {
    const {isLoading, data = []} = useGetCurrencyQuery()
    const dispatch = useDispatch()
    const [currentCurrency, setCurrentCurrencyLocal] = useState('')
    const {isAuth,email} = useAuth()
    const currentUser = useCurrentUser()
    const db = getDatabase();
    const isSetFav = useSetFav(currentCurrency)
    const favourites = useFavourites()
    const favState = useSelector(state => state.fav)
    const path = `users/${currentUser}/favourites/${currentCurrency.cc}`

    const setCurrency = (e) => {
        setCurrentCurrencyLocal(data.find(item => item.txt === e.target.value))
        dispatch(setCurrentCurrency(currentCurrency))
    }

    const AddToFav = () => {
        dispatch(addToFav(currentCurrency))
        set(ref(db, path), {
            currencyName: currentCurrency.txt,
            currencyRate: currentCurrency.rate
        }).then(() => {})
    }

    const deleteFromFav = () => {
        dispatch(deleteFav(currentCurrency.txt))
        remove(ref(db, path)).then(() => {})
    }

    useEffect(() => {

    }, [favState])

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
            <button
                onClick={()=> dispatch(removeUser())}
            >Log out from {email}</button>
        </div>) : (
            <Navigate to='/login'/>
        )
    );
};

export default HomePage;