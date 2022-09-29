import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useGetCurrencyQuery} from "../store/currency/currency.api";
import {addToFav, deleteFav} from "../store/currency/favSlice";

const HomePage = () => {
    const {isLoading, data = []} = useGetCurrencyQuery()
    const favorites = useSelector(state => state.fav.fav)
    const dispatch = useDispatch()
    const [currentCurrency, setCurrentCurrency] = useState('')

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
            {isLoading && <h2 className="text-center">Loading...</h2>}
            <select onChange={setCurrency}>
                {data.map(item => <option
                    key={item.r030}
                >
                    {item.txt}</option>)}
            </select>
            <span className="ml-2">{currentCurrency.rate}</span>

            {!favorites.includes(currentCurrency) && <button className='py-2 px-4 bg-yellow-400 ml-2 rounded hover:shadow-md transition-all'
                onClick={AddToFav}
            >Add</button>}

            {favorites.includes(currentCurrency) && <button className='py-2 px-4 bg-red-400 rounded hover:shadow-md transition-all'
                onClick={deleteFromFav}
            >Remove</button>
            }

        </div>
    );
};

export default HomePage;