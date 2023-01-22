import { Movie } from "../models";

export const getYear = (movie: Movie): number => {
    return new Date(movie.premiere_date).getFullYear();
}

export const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes - 60 * hours;

    return `${ hours < 10 ? `0${ hours }` : hours }:${ mins }`;
}
