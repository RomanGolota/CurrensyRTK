import React from 'react';
import {useNavigate} from 'react-router-dom'
import Form from "./Form"
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"
import { getDatabase, ref,  set} from "firebase/database";
import {getUserName} from "../helpers/helpers";

const SignUp = () => {
    const navigate = useNavigate()
    const db = getDatabase();

    const handleRegister = (email, password) => {
        const auth = getAuth()
        const userName = getUserName(email)
        createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                console.log(user)
                set(ref(db, 'users/' + userName), {
                    email: email,
                    fav: []
                })
                navigate('/')
            })
            .catch()
    }

    return (
        <div>
            <Form
                greetingAction="Register your account"
                link="/login"
                title="Register"
                handleClick={handleRegister}
                actiontype=" Login"
                titleActionText=" Already have an account?"
            />

        </div>
    );
};

export default SignUp;