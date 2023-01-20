import { $api } from "../index";
import { Movie } from "../../models/movie/Movie";

export const getAllMovies = async (): Promise<Movie[]> => {
    const res = await $api.get('/movies/all');

    return res.data ?? [];
}

export const getMovieById = async (id: number): Promise<Movie> => {
    const res = await $api.get(`/movies/movie/${ id }`);

    return res.data;
}

export const searchMovies = async (searchValue: string): Promise<Movie[]> => {
    const res = await $api.get(`/movies?search=${ searchValue }`);

    return res.data;
}

export const filterMovies = async (genre?: number, year?: string): Promise<Movie[]> => {
    if (!genre && !year) throw new Error("No options specified");

    if (genre) {
        const res = await $api.get(`/movies/genre/${ genre }`);

        return res.data;
    }

    if (year) {
        const res = await $api.get(`/movies/year/${ year }`);

        return res.data;
    }

    return [];
}
