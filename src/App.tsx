import React, { lazy, Suspense, useEffect, useLayoutEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { $api } from "./api";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "./hooks";
import { AuthorizedUser } from "./models";
import { logout, updateTokens } from "./service/AuthService";
import {
    CountriesActionSet,
    DirectorsActionSet,
    GenresActionSet,
    MovieActionSet,
    SeriesActionSet,
    UserActionLogOut,
    UserActionRefreshToken
} from "./store/action-creators";
import { Loader } from "./components/common/loader";
import { movies, series } from "./mocks";
import { getAllCountries, getAllDirectors, getAllGenres } from "./api/repos";

const Header = lazy(() => import("./components/header/Header"));
const Routing = lazy(() => import("./routing").then(({ Routing }) => ({ default: Routing })));

const App = () => {
    const { user } = useTypedSelector(state => state.user);
    const currentUser = user as AuthorizedUser;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /*useEffect(() => {
        dispatch(MovieActionSet(movies));
        dispatch(SeriesActionSet(series));
        getAllCountries().then(countries => {
            dispatch(CountriesActionSet(countries));
        })
        getAllGenres().then(genres => {
            dispatch(GenresActionSet(genres));
        })
        getAllDirectors().then(directors => {
            dispatch(DirectorsActionSet(directors));
        })
    }, [dispatch]);*/

    useLayoutEffect(() => {
        dispatch(MovieActionSet(movies));
        dispatch(SeriesActionSet(series));
        getAllCountries().then(countries => {
            dispatch(CountriesActionSet(countries));
        })
        getAllGenres().then(genres => {
            dispatch(GenresActionSet(genres));
        })
        getAllDirectors().then(directors => {
            dispatch(DirectorsActionSet(directors));
        })
    }, [dispatch])

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
        <Suspense fallback={ <Loader/> }>
            <Header/>
            <Routing/>
        </Suspense>
    );
}

export default App;
