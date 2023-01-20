import React, { FC, useState } from 'react';
import styles from "./MovieCard.module.scss";
import { Link } from "react-router-dom";
import { movies } from "../../../mocks";

type MovieCardProps = {
    movieId: number,
    posterId: number,
    caption: string,
    type?: "movie" | "series"
}

const MovieCard: FC<MovieCardProps> = (
    { posterId, caption, movieId, type = "movie" }
) => {
    return (
        <figure
            className={ styles.movieCard }
        >
            <Link to={ `/${ type }/${ movieId }` }>
                <img
                    src={ `http://localhost:8000/static/images/posters/${ posterId }.png` }
                    alt={ caption }
                />
            </Link>
            <figcaption>{ caption }</figcaption>
        </figure>
    );
};

export default MovieCard;
