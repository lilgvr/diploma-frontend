import React, { FC, useEffect, useState, Suspense } from 'react';
import { useParams } from "react-router-dom";
import { filterMovies, getMovieById } from "../../api/repos/movie";
import { Movie } from "../../models/movie/Movie";
import { Loader } from "../../components/common/loader";

const getYear = (movie: Movie) => {
    return new Date(movie.premiere_date).getFullYear();
}

const MoviePage: FC = () => {
    const [currentMovie, setCurrentMovie] = useState<Movie>();
    const { id } = useParams();

    /* TODO
    * Get movie from store
    *
    * Now: getting movie from server
    *
    * */

    useEffect(() => {
        id && getMovieById(+id).then(movie => setCurrentMovie(movie));
        filterMovies(1).then(movies => {
            console.log(movies)
        })
    }, [id]);

    return (
        <div>
            {
                currentMovie &&
              <Suspense fallback={ <Loader/> }>
                <p>{ currentMovie.title }</p>
                <p>{ getYear(currentMovie) }</p>
              </Suspense>
            }
        </div>
    );
};


export default MoviePage;
