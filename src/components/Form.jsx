import React from 'react';
import {useState} from "react";
import styles from './Form.module.css'

const Form = ({title, handleClick, link, actiontype, titleActionText, greetingAction}) => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    return (

            <div className="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">
                <header className="max-w-lg mx-auto">
                    <a>
                        <h1 className="text-4xl font-bold text-white text-center">Startup</h1>
                    </a>
                </header>

                <main className={styles.mainBlock}>
                    <section>
                        <h3 className={styles.h3Greetings}>Welcome to Currency monitoring</h3>
                        <p className={styles.pGreetings}>{greetingAction}</p>
                    </section>
                    <section className={styles.section}>
                        <div className={styles.form}>
                            <div className={styles.divLogin}>
                                <label className={styles.labelLogin}>Email</label>
                                <input
                                    className={styles.inputLogin}
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className={styles.divLogin}>
                                <label className={styles.labelLogin}>Password</label>
                                <input
                                    className={styles.inputLogin}
                                    type="password"
                                    value={pass}
                                    onChange={(e) => setPass(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end">
                                <a className="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6">
                                    Forgot your password?
                                </a>
                            </div>
                            <button
                                className={styles.actionButton}
                                onClick={() => handleClick(email, pass)}
                            >
                                {title}
                            </button>
                        </div>
                    </section>
                </main>
                <div className="max-w-lg mx-auto text-center mt-12 mb-6">
                    <p>{titleActionText}
                        <a href={link} className="font-bold hover:underline">{actiontype}</a>.
                    </p>
                </div>
            </div>

    );
};

export default Form;