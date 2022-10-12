import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import {deleteFav} from "../store/currency/favSlice"
import {useFavourites} from "../hooks/use-favourites"
import Navigation from "../components/Navigation"
import styles from './FavouritesPage.module.css'

const FavouritesPage = () => {
    const dispatch = useDispatch()
    const favourites = useFavourites()

    return (
        <div>
            <Navigation/>
            {favourites.map(i => <div key={Date.now() + i.currencyName} className={styles.favElem}>{i.currencyName} {i.currencyRate} <button
                     className={styles.deleteButton}
                     onClick={() => dispatch(deleteFav(i.txt))}
                     >Delete</button>
                </div>)
            }
        </div>
    );
};

export default FavouritesPage;