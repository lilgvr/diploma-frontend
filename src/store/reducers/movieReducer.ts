import { MovieState } from "../types";
import { MOVIE_ACTIONS, MovieAction } from "../actions/MovieAction";

const initialMovieState: MovieState = {
    movies: []
}

export const movieReducer = (state: MovieState = initialMovieState, action: MovieAction): MovieState => {
    switch (action.type) {
        case MOVIE_ACTIONS.SET_MOVIES:
            return { ...state, movies: action.payload }
        default:
            return state;
    }
}
