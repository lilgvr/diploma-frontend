import React, { FC, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Loader } from "../components/loader";

const HomePage = lazy(() => import('../pages/home/HomePage'));
const LoginPage = lazy(() => import('../pages/login/LoginPage'));
const RegisterPage = lazy(() => import('../pages/register/RegisterPage'));
const RoomPage = lazy(() => import('../pages/room/RoomPage'));
const UserPage = lazy(() => import('../pages/user/UserPage'));
const MoviePage = lazy(() => import('../pages/movie/MoviePage'));

export const Routing: FC = () => {
    return (
        <Suspense fallback={ <Loader/> }>
            <Routes>
                <Route path="/" element={ <HomePage/> }/>
                <Route path="/login" element={ <LoginPage/> }/>
                <Route path="/register" element={ <RegisterPage/> }/>
                <Route path="/room/:id" element={ <RoomPage/> }/>
                <Route path="/profile" element={ <UserPage/> }/>
                {/* TODO изменить методы на бэке*/}
                <Route path="/movie/:id" element={ <MoviePage/> }/>
                <Route path="/favorites" element={ <MoviePage/> }/>
            </Routes>
        </Suspense>
    );
}
