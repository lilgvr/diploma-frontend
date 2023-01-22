import React, { FC, lazy, Suspense, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Movie } from "../../models";
import { Loader } from "../../components/common/loader";
import { useDocTitle, useTypedSelector } from "../../hooks";
import styles from "./MoviePage.module.scss";

const MovieInfoBlock = lazy(
    () => import("../../components/movie/MovieInfoBlock/MovieInfoBlock")
);
const MovieDescriptionBlock = lazy(
    () => import("../../components/movie/MovieDescriptionBlock/MovieDescriptionBlock")
);
const MovieRoomsBlock = lazy(
    () => import("../../components/movie/MovieRoomsBlock/MovieRoomsBlock")
);

type MovieType = "movie" | "series";

const MoviePage: FC = () => {
    const { movies, series } = useTypedSelector(state => state.movie);
    const [currentMovie, setCurrentMovie] = useState<Movie>();
    const [movieType, setMovieType] = useState<MovieType>("movie");
    const { id } = useParams();

    useDocTitle(currentMovie?.title ?? "Фильм");

    useEffect(() => {
        setMovieType(window.location.pathname.split('/')[1] as MovieType);
    }, []);

    useEffect(() => {
        switch (movieType) {
            case "movie":
                id && setCurrentMovie(movies.find(movie => movie.id === +id));
                break;
            case "series":
                id && setCurrentMovie(series.find(s => s.id === +id));
        }
    }, [id, movieType, movies, series]);

    return (
        <main className={ styles.moviePageCtr }>
            <Suspense fallback={ <Loader/> }>
                {
                    currentMovie &&
                  <>
                    <div className={ styles.movieDataCtr }>
                      <MovieInfoBlock movie={ currentMovie }/>
                      <MovieDescriptionBlock description={ currentMovie.description }/>
                    </div>
                    <MovieRoomsBlock movieId={ currentMovie.id }/>
                  </>
                }
            </Suspense>
        </main>
    );
};


export default MoviePage;
