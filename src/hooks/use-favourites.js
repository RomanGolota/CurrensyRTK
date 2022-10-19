import { getDatabase, ref, onValue} from "firebase/database";
import {useCurrentUser} from "./use-currentUser";

export const useFavourites = () => {
    const db = getDatabase();
    const currentUser = useCurrentUser()
    const usersDB = ref(db, `/users/${currentUser}/favourites`)
    let response = []

    onValue(usersDB, (snapshot) => {
        const data = snapshot.val();
        response = Object.values(data)
        // console.log(response)
    })

    return response
}

