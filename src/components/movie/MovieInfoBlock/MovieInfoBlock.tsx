import React, { FC, useEffect, useState } from 'react';
import { Country, Director, Genre, Movie } from "../../../models";
import { useTypedSelector } from "../../../hooks";
import { formatDuration, getYear } from "../../../utils/functions";
import styles from "./MovieInfoBlock.module.scss";
import { IMG_URL } from "../../../api";

const MovieInfoBlock: FC<{ movie: Movie }> = ({ movie }) => {
    const { countries, genres, directors } = useTypedSelector(state => state.movie);
    const [country, setCountry] = useState<Country>();
    const [genre, setGenre] = useState<Genre>();
    const [director, setDirector] = useState<Director>();

    useEffect(() => {
        countries && setCountry(countries.find(c => c.id === movie.country_id));
        genres && setGenre(genres.find(g => g.id === movie.genre_id));
        directors && setDirector(directors.find(d => d.id === movie.director_id));
    }, [countries, directors, genres, movie.country_id, movie.director_id, movie.genre_id]);

    return (
        <div className={ styles.movieInfoBlock }>
            {
                movie &&
              <>
                <img src={ `${ IMG_URL }/posters/${ movie.poster_id }.png` } alt={ movie.title }/>
                <div className={ styles.movieInfoBlockMain }>
                  <span>{ movie.title }<span>{ getYear(movie) }</span></span>
                  <span>Страна: <span>{ country?.name }</span></span>
                  <span>Жанр: <span>{ genre?.title }</span></span>
                  <span>Режиссер: <span>{ director?.name }</span></span>
                  <span>IMDb: <span>{ movie.imdb }</span></span>
                  <span>Кинопоиск: <span>{ movie.kinopoisk }</span></span>
                  <span>
                  Длительность:
                  <span>
                    { movie.duration } мин. / { formatDuration(movie.duration) }
                  </span>
                </span>
                </div>
                <div className={ styles.movieInfoBlockButtons }>
                    <p>wa</p>
                </div>
              </>
            }
        </div>
    );
};

export default MovieInfoBlock;
