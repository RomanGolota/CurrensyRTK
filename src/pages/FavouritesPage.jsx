import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteFav} from "../store/currency/favSlice";
import styles from './FavouritesPage.module.css'

const FavouritesPage = () => {
    const favorites = useSelector(state => state.fav.fav)
    const dispatch = useDispatch()

    return (
        <div>
            {favorites.map(i => <div key={Date.now() + i.txt}>{i.txt} {i.rate} <button
                     className={styles.deleteButton}
                     onClick={() => dispatch(deleteFav(i.txt))}
                     >Delete</button>
                </div>)
            }
        </div>
    );
};

export default FavouritesPage;