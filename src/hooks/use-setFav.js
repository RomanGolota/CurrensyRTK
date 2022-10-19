import {useFavourites} from "./use-favourites";

export const useSetFav = (currentCurrency) => {
    const favorites = useFavourites()
    // console.log(favorites)
    return favorites.some(i => i === currentCurrency.cc)
}