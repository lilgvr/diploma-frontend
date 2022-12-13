import React, { FC, useEffect } from 'react';
import { useTypedSelector } from "../../hooks";
import { deleteUser, logout } from "../../service/AuthService";
import { useDispatch } from "react-redux";
import { UserActionLogOut } from "../../store/action-creators/user/UserActionLogOut";
import styles from "./home-page.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { UserActionDelete } from "../../store/action-creators/user/UserActionDelete";
import { AuthorizedUser } from "../../models/user";
import { $api } from "../../http";

const HomePage: FC = () => {
    const { logged_in, user } = useTypedSelector(state => state.user);
    const currentUser = user as AuthorizedUser;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Главная';
    }, []);

    const handleLogoutClick = () => {
        logout(currentUser.id).then(() => {
            dispatch(UserActionLogOut());
            navigate('/login');
        });
    }

    const handleDeleteClick = () => {
        deleteUser(currentUser.id).then(() => {
            dispatch(UserActionDelete(currentUser));
            navigate('/login');
        })
    }

    const handleClick = () => {
        $api.get('/movies/all').then(res => {
            if (res?.status === 200) console.log(res.data);
        })
    }

    return (
        <main className={ styles.homeMain }>
            { logged_in ?
                <>
                    <h1>Привет, { currentUser.name } </h1>
                    <p onClick={ handleLogoutClick }>Выйти</p>
                    <p onClick={ handleDeleteClick }>Удалить аккаунт</p>
                    <p onClick={ handleClick }>Тест</p>
                </>
                : <>
                    <h1>Главная</h1>
                    <Link to="/login">Войти</Link>
                </> }

        </main>
    );
};

export default HomePage;
