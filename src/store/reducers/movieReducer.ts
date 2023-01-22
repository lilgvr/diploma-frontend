import { MovieState } from "../types";
import { MOVIE_ACTIONS, MovieAction } from "../actions/MovieAction";
import { Country, Director, Genre, Movie } from "../../models";

const initialMovieState: MovieState = {
    movies: [],
    series: [],
    countries: [],
    genres: [],
    directors: []
}

export const movieReducer = (state: MovieState = initialMovieState, action: MovieAction): MovieState => {
    switch (action.type) {
        case MOVIE_ACTIONS.SET_MOVIES:
            return { ...state, movies: action.payload as Movie[] }
        case MOVIE_ACTIONS.SET_SERIES:
            return { ...state, series: action.payload as Movie[] }
        case MOVIE_ACTIONS.SET_COUNTRIES:
            return { ...state, countries: action.payload as Country[] }
        case MOVIE_ACTIONS.SET_GENRES:
            return { ...state, genres: action.payload as Genre[] }
        case MOVIE_ACTIONS.SET_DIRECTORS:
            return { ...state, directors: action.payload as Director[] }
        default:
            return state;
    }
}
