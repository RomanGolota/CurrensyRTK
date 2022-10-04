import {useSelector} from "react-redux";

export const useFavourites = () => {
    let favorites = useSelector(state => state.fav.fav).map(item => Object.values(item))
    favorites = [].concat(...favorites)

    return favorites
}