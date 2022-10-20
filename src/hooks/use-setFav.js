import {useFavourites} from "./use-favourites";

export const useSetFav = (currentCurrency) => {
    const favorites = useFavourites()

    return favorites.some(i => i === currentCurrency.cc)
}