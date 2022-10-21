import React from 'react';
import {Navigate} from "react-router-dom";
import {useAuth} from "../../hooks/use-auth";

const RedirectPage = () => {
    const {isAuth} = useAuth()

    return (
        <div>
            {isAuth ? (<Navigate to='/homepage'/>) : (<Navigate to='/login'/>)}
        </div>
    );
};

export default RedirectPage;