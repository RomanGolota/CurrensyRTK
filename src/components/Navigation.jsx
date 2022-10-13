import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import styles from './Navigation.module.css'
import {removeUser} from "../store/currency/userSlice";
import {useAuth} from "../hooks/use-auth";

const Navigation = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {email} = useAuth()

    const logout = () => {
        dispatch(removeUser())
        navigate('/homepage')
    }

    return (
        <nav className={styles.navbar}>
            <h3 className="font-bold">Currency search</h3>
            <span>
                <Link to="/" className="mr-2">Home</Link>
                <Link to="/favourites">Favourites</Link>
                            <button className={styles.LogoutButton}
                                    onClick={logout}
                            >Log out from {email}</button>
            </span>
        </nav>
    );
};

export default Navigation;