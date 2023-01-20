import React, { FC, Suspense, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Movie } from "../../models";
import { Loader } from "../../components/common/loader";
import { useDocTitle, useTypedSelector } from "../../hooks";

const getYear = (movie: Movie) => {
    return new Date(movie.premiere_date).getFullYear();
}

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

    /* TODO
    * Get movie from store
    *
    * Now: getting movie from server
    *
    * */

    /*useEffect(() => {
        id && getMovieById(+id).then(movie => setCurrentMovie(movie));
    }, [id]);*/

    return (
        <div>
            <Suspense fallback={ <Loader/> }>
                {
                    currentMovie &&
                  <>
                    <p>{ currentMovie.title }</p>
                    <p>{ getYear(currentMovie) }</p>
                  </>
                }
            </Suspense>
        </div>
    );
};


export default MoviePage;
