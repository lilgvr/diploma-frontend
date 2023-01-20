import { MovieState } from "../types";
import { MOVIE_ACTIONS, MovieAction } from "../actions/MovieAction";
import { Movie, Poster } from "../../models";

const initialMovieState: MovieState = {
    movies: [],
    series: [],
    posters: []
}

export const movieReducer = (state: MovieState = initialMovieState, action: MovieAction): MovieState => {
    switch (action.type) {
        case MOVIE_ACTIONS.SET_MOVIES:
            return { ...state, movies: action.payload as Movie[] }
        case MOVIE_ACTIONS.SET_POSTERS:
            return { ...state, posters: action.payload as Poster[] }
        case MOVIE_ACTIONS.SET_SERIES:
            return { ...state, series: action.payload as Movie[] }
        default:
            return state;
    }
}
