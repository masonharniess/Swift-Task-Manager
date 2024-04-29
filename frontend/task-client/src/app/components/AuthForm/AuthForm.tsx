// AuthForm.tsx

'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { login, register } from '@/app/services/authService';
import styles from './AuthForm.module.css';
import BrandLogo from '../common/BrandLogo/BrandLogo';

const AuthForm = ({ isLogin }: { isLogin: boolean }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const buttonText = isLogin ? 'Login' : 'Register';
    const accountQuestion = isLogin ? "Don't have an account?" : "Have an account?";
    const accountAction = isLogin ? 'Register' : 'Log in';
    const actionLink = isLogin ? '/register' : '/login';

    const registrationInputs = !isLogin && (
        <>
            <input
                className={styles.inputField}
                type="text"
                value={firstName}
                onChange={({ target }) => setFirstName(target.value)}
                placeholder="First Name"
            />
            <input
                className={styles.inputField}
                type="text"
                value={lastName}
                onChange={({ target }) => setLastName(target.value)}
                placeholder="Last Name"
            />
        </>
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const data = isLogin ? await login(email, password) : await register(email, password, firstName, lastName);
            localStorage.setItem('token', data.token);
            router.push('/dashboard');
        } catch (error) {
            setError('Your details are not correct. Please check them and try again.');
            console.error(error);
        }
    };

    return (
        <div className={styles.formWrapper}>
            <form onSubmit={handleSubmit} className={styles.form}>

                <BrandLogo />

                <h3 className={styles.tagline}>Your path to productivity.</h3>

                <input className={styles.inputField} type="email"    value={email}    onChange={({target}) => setEmail(target.value)}    placeholder="Email"/>
                <input className={styles.inputField} type="password" value={password} onChange={({target}) => setPassword(target.value)} placeholder="Password"/>

                {registrationInputs}

                <button className={styles.submitButton} type="submit">
                    {buttonText}
                </button>

                {error && <p className={styles.error}>{error}</p>}

                <p className={styles.p}>
                    <span>
                        {accountQuestion}
                        <a className={styles.links} href={actionLink}> {accountAction}</a>
                    </span>
                </p>

            </form>
        </div>
    );
};

export default AuthForm;
