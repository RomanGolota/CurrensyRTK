import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Navigate, Route} from "react-router-dom";
import {useGetCurrencyQuery} from "../store/currency/currency.api";
import {addToFav, deleteFav} from "../store/currency/favSlice";
import styles from './HomePage.module.css'
import {useAuth} from  '../../src/hooks/use-auth'
import {removeUser} from "../store/currency/userSlice";

const HomePage = () => {
    const {isLoading, data = []} = useGetCurrencyQuery()
    const favorites = useSelector(state => state.fav.fav)
    const dispatch = useDispatch()
    const [currentCurrency, setCurrentCurrency] = useState('')
    const {isAuth, email} = useAuth()

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
        <div>
            {isAuth ? (<Navigate to='/'/>) : (<Navigate to='/login'/>)}

            {isLoading && <h2 className="text-center">Loading...</h2>}
            <select onChange={setCurrency}>
                <option>Choose currency</option>
                {data.map(item => <option
                    key={item.r030}
                >
                    {item.txt}</option>)}
            </select>
            <span className="ml-2">{currentCurrency?.rate}</span>

            {!favorites.includes(currentCurrency) && currentCurrency && <button className={styles.addButton}
                onClick={AddToFav}
            >Add</button>}

            {favorites.includes(currentCurrency) && <button className={styles.removeButton}
                onClick={deleteFromFav}
            >Remove</button>
            }
            <button
                onClick={() =>  dispatch(removeUser)}
            >Log out from {email}</button>
        </div>
    );
};

export default HomePage;