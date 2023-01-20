import React, { lazy, Suspense, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { $api } from "./api";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "./hooks";
import { AuthorizedUser } from "./models";
import { logout, updateTokens } from "./service/AuthService";
import { UserActionRefreshToken } from "./store/action-creators/user/UserActionRefreshToken";
import { UserActionLogOut } from "./store/action-creators/user/UserActionLogOut";
import { Routing } from "./routing";
import { Loader } from "./components/common/loader";
import { MovieActionSet } from "./store/action-creators/movie";
import { movies, posters } from "./mocks";
import { PosterActionSet } from "./store/action-creators/movie/PosterActionSet";
import { SeriesActionSet } from "./store/action-creators/movie/SeriesActionSet";
import { series } from "./mocks/series";

const Header = lazy(() => import("./components/header/Header"));

const App = () => {
    const { user } = useTypedSelector(state => state.user);
    const currentUser = user as AuthorizedUser;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /*useEffect(() => {
        getAllMovies().then((movies) => {
            dispatch(MovieActionSet(movies));
        });
        getAllPosters().then(posters => {

        })
    }, [dispatch]);*/

    useEffect(() => {
        dispatch(MovieActionSet(movies));
        dispatch(PosterActionSet(posters));
        dispatch(SeriesActionSet(series));
    }, [dispatch]);

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
