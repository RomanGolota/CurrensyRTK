import React from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom'
import Form from "./Form"
import {setUser} from "../store/currency/userSlice";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = (email, password) => {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                console.log(user)
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken
                }))
                navigate('/homepage')
            })
            .catch(() => alert('Invalid User!'))
    }

    return (
        <div>
            <Form
                title="sign in"
                handleClick={handleLogin}
            />
        </div>
    );
};

export default Login;