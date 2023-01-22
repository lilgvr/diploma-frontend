import React, { FC } from 'react';
import styles from "./MovieDescriptionBlock.module.scss";

const MovieDescriptionBlock: FC<{ description: string }> = ({ description }) => {
    return (
        <div className={ styles.movieDescriptionBlock }>
            <p>Описание</p>
            <p>{ description }</p>
        </div>
    );
};

export default MovieDescriptionBlock;
