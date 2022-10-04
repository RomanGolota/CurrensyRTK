import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {useGetCurrencyQuery} from "../store/currency/currency.api";
import {addToFav, deleteFav} from "../store/currency/favSlice";
import styles from './HomePage.module.css'
import {useAuth} from '../hooks/use-auth'
import {removeUser} from "../store/currency/userSlice";
import Navigation from "../components/Navigation";
import {useFavourites} from "../hooks/use-favourites";
import {Navigate} from "react-router-dom";

const HomePage = () => {
    const {isLoading, data = []} = useGetCurrencyQuery()
    const favorites = useFavourites()
    const dispatch = useDispatch()
    const [currentCurrency, setCurrentCurrency] = useState('')
    const {isAuth,email} = useAuth()

    const setCurrency = (e) => {
        setCurrentCurrency(data.find(item => item.txt === e.target.value))
    }

    const AddToFav = () => {
        dispatch(addToFav(currentCurrency))
    }

    const deleteFromFav = () => {
        dispatch(deleteFav(currentCurrency.txt))
    }

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

            {!favorites.includes(currentCurrency.cc) && currentCurrency && <button className={styles.addButton}
                onClick={AddToFav}
            >Add</button>}

            {favorites.includes(currentCurrency.cc) && <button className={styles.removeButton}
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