import React, { FC, FormEvent, useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { login } from "../../service/AuthService";
import { UserActionLogIn } from "../../store/action-creators/user";
import { Link, useNavigate } from "react-router-dom";

import styles from "./login-page.module.scss";
import { AuthResponse } from "../../models/auth/AuthResponse";
import { useDocTitle } from "../../hooks";

const LoginPage: FC = () => {
    const [loginData, setLoginData] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useDocTitle('Вход');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        login(loginData, password).then(res => {
            if (res.status === 200) {
                const data = res.data as AuthResponse;

                localStorage.setItem('access-token', data.access_token.value as string);
                localStorage.setItem('access-token/expires-in', JSON.stringify(data.access_token.expires));
                dispatch(UserActionLogIn(data));
                navigate('/');
            }
        }).catch(err => {
            setError(err.response.data.message);
        })
    }

    const handleLoginDataChange = (e: FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setLoginData(target.value);
    }

    const handlePasswordChange = (e: FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setPassword(target.value);
    }

    return (
        <main className={ styles.loginMain }>
            <h2>Вход</h2>
            <form onSubmit={ handleSubmit }>
                <input
                    type="text"
                    name="loginData"
                    id="loginData"
                    placeholder="Логин/Email"
                    onChange={ handleLoginDataChange }
                    required
                />
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Пароль"
                    minLength={ 8 }
                    onChange={ handlePasswordChange }
                    required
                />
                <button type="submit">Войти</button>
            </form>

            <p>Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>
            <br/>
            <p className={ styles.error }>{ error }</p>
        </main>
    );
};

export default LoginPage;
