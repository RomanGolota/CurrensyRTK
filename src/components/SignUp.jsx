import React from 'react';
import {useNavigate} from 'react-router-dom'
import {useDispatch} from "react-redux";
import Form from "./Form"
import {setUser} from "../store/currency/userSlice";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"


const SignUp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleRegister = (email, password) => {
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                console.log(user)
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken
                }))
                navigate('/')
            })
            .catch()
    }

    return (
        <div>
            <Form
                title="register"
                handleClick={handleRegister}
            />

        </div>
    );
};

export default SignUp;