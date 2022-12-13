import React, { FC, FormEvent, useCallback, useEffect, useState } from 'react';
import axios from "axios";
import { API_URL } from "../../http";
import { register } from "../../service/AuthService";
import styles from "./register-page.module.scss";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage: FC = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [country, setCountry] = useState("");
    const [sex, setSex] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [countriesList, setCountriesList] = useState([]);

    const navigate = useNavigate();

    const fetchCountries = useCallback(() => {
        axios.get(`${ API_URL }/countries/all`).then(countries => {
            setCountriesList(countries.data);
            setIsLoading(false);
        });
    }, [])

    useEffect(() => {
        document.title = 'Регистрация';
    }, []);

    useEffect(() => {
        fetchCountries();
    }, [fetchCountries]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        register({
            name,
            username,
            email,
            birthDate,
            password,
            countryId: +country,
            sex: +sex
        }).then(res => {
            console.log(res.status);
            navigate('/');
        })
    }

    const handleNameChange = (e: FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setName(target.value);
    }

    const handleUsernameChange = (e: FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setUsername(target.value);
    }

    const handleEmailChange = (e: FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setEmail(target.value);
    }

    const handleBirthDateChange = (e: FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setBirthDate(target.value);
    }

    const handleCountryChange = (e: FormEvent<HTMLSelectElement>) => {
        const target = e.target as HTMLInputElement;
        setCountry(target.value);
    }

    const handlePasswordChange = (e: FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setPassword(target.value);
    }

    const handleSexChange = (e: FormEvent<HTMLSelectElement>) => {
        const target = e.target as HTMLInputElement;
        setSex(target.value);
    }

    return (
        <main className={ styles.registerMain }>
            <h2>Регистрация</h2>
            <form onSubmit={ handleSubmit }>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Имя"
                    onChange={ handleNameChange }
                    required
                />

                <div>
                    <label htmlFor="country">
                        Страна
                    </label>
                    <select
                        name="country"
                        id="country"
                        onChange={ handleCountryChange }
                        required
                    >
                        { isLoading ? <option disabled>Загрузка...</option> :
                            countriesList && countriesList.map(
                                (
                                    country: { id: number, name: string }
                                ) =>
                                    <option
                                        value={ country.id }
                                        key={ "country" + country.id }
                                    >{ country.name }
                                    </option>
                            )
                        }
                    </select>
                </div>

                <div>
                    <label htmlFor="birthDate">
                        Дата рождения
                    </label>
                    <input
                        type="date"
                        name="birthDate"
                        id="birthDate"
                        max={ new Date().toISOString().split("T")[0] }
                        onChange={ handleBirthDateChange }
                        required
                    />
                </div>
                <div>
                    <label htmlFor="sex">
                        Пол
                    </label>
                    <select
                        name="sex"
                        id="sex"
                        onChange={ handleSexChange }
                        required
                    >
                        <option value={ 1 }>Мужской</option>
                        <option value={ 2 }>Женский</option>
                    </select>
                </div>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Логин"
                    onChange={ handleUsernameChange }
                    required
                />
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={ handleEmailChange }
                    required
                />


                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Пароль"
                    onChange={ handlePasswordChange }
                    required
                />
                <button type="submit">Зарегистрироваться</button>
            </form>
            <p>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
        </main>
    );
};

export default RegisterPage;
