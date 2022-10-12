import {useSelector} from "react-redux";

export const useCurrentUser = () => {
    const currentUser = useSelector(state => state.user.currentUser)

    return currentUser
}