import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import { $api, $cleanApi } from "./http";
import { useDispatch } from "react-redux";
import { LoginHeader } from "./components/login-header";
import { useTypedSelector } from "./hooks";
import { AuthorizedUser } from "./models/user";
import { Loader } from "./components/loader";
import { logout, updateTokens } from "./service/AuthService";
import { UserActionRefreshToken } from "./store/action-creators/user/UserActionRefreshToken";
import { UserActionLogOut } from "./store/action-creators/user/UserActionLogOut";

const HomePage = lazy(() => import('./pages/home/HomePage'));
const LoginPage = lazy(() => import('./pages/login/LoginPage'));
const RegisterPage = lazy(() => import('./pages/register/RegisterPage'));

const App = () => {
    const { user } = useTypedSelector(state => state.user);
    const currentUser = user as AuthorizedUser;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        $api.interceptors.request.use(async config => { // FIXME
            const expiresIn: string = JSON.parse(localStorage.getItem('access-token/expires-in') ?? "{}");

            if (new Date(expiresIn).getTime() <= Date.now() - 30000) {
                const res = await updateTokens();

                if (res.status === 200) {
                    dispatch(UserActionRefreshToken(res.data));
                    return Promise.resolve(config);
                }

                logout(currentUser.id).then(() => {
                    dispatch(UserActionLogOut());
                    navigate('/login');
                })
            }

            return Promise.resolve(config);
        })

    }, [currentUser?.id, dispatch, navigate]);

    return (
        <>
            <LoginHeader/>
            <Suspense fallback={ <Loader/> }>
                <Routes>
                    <Route path="/" element={ <HomePage/> }/>
                    <Route path="/login" element={ <LoginPage/> }/>
                    <Route path="/register" element={ <RegisterPage/> }/>
                </Routes>
            </Suspense>
        </>
    );
}

export default App;
