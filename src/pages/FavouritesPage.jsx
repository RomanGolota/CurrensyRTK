import React from 'react';
import {useSelector} from "react-redux";

const FavouritesPage = () => {
    const favorites = useSelector(state => state.fav.fav)
    console.log(favorites)
    return (
        <div>
            {favorites.map(i => <div key={Date.now()}>{i.txt} {i.rate}</div>)}
        </div>
    );
};

export default FavouritesPage;