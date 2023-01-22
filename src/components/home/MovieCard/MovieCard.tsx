import React, { FC } from 'react';
import styles from "./MovieCard.module.scss";
import { Link } from "react-router-dom";

type MovieCardProps = {
    movieId: number,
    posterId: number,
    caption: string,
    type?: "movie" | "series",
    onLoad?: (promise: Promise<boolean>) => void
}

const MovieCard: FC<MovieCardProps> = (
    { posterId, caption, movieId, type = "movie", onLoad }
) => {
    /*const onLoaded = () => {
        onLoad(new Promise((resolve) => {
            resolve(true);
            console.log(posterId)
        }))
    }

    const onError = () => {
        onLoad(new Promise((_, reject) => {
            reject(false);
        }))
    }*/

    return (
        <figure
            className={ styles.movieCard }
        >
            <Link to={ `/${ type }/${ movieId }` }>
                <img
                    src={ `http://localhost:8000/static/images/posters/${ posterId }.png` }
                    alt={ caption }
                   /* onLoad={ onLoaded }
                    onError={ onError }*/
                />
            </Link>
            <figcaption>{ caption }</figcaption>
        </figure>
    );
};

export default MovieCard;
