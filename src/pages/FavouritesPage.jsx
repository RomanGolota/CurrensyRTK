import React, {useEffect, useState} from 'react'
import {useFavourites} from "../hooks/use-favourites"
import {getDatabase, ref, remove} from "firebase/database";
import {useCurrentUser} from "../hooks/use-currentUser";
import Navigation from "../components/Navigation"
import styles from './FavouritesPage.module.css'

const FavouritesPage = () => {
    const [query, setQuery] = useState('redux');
    const favourites = useFavourites()
    const currentUser = useCurrentUser()
    const db = getDatabase()

    const removeFromFav = (e) => {
        const deletedCurrency = (e.target.parentElement.innerText).split('').splice(0, 3).join('')
        remove(ref(db, `users/${currentUser}/favourites/${deletedCurrency}`)).then(() => {setQuery(deletedCurrency)})
    }

    useEffect(() => {

    }, [query])

    return (
        <div>
            <Navigation/>
            {favourites.map(i => <div key={Date.now() + i.currencyName} className={styles.favElem}>
                <span>{i.currencyCC}</span>
                <span className="mx-1">{i.currencyName}</span>
                <span className="mx-1">{i.currencyRate}</span>
                <button
                     className={styles.deleteButton}
                     onClick={removeFromFav}
                >
                    Delete
                </button>
                </div>)
            }
        </div>
    );
};

export default FavouritesPage;