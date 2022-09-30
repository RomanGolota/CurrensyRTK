import React from 'react';
import {Link} from "react-router-dom";
import styles from './Navigation.module.css'

const Navigation = () => {
    return (
        <nav className={styles.navbar}>
            <h3 className="font-bold">Currency search</h3>
            <span>
                <Link to="/" className="mr-2">Home</Link>
                <Link to="/favourites">Favourites</Link>
            </span>
        </nav>
    );
};

export default Navigation;