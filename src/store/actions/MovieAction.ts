import { Action } from "redux";
import { Movie, Poster } from "../../models";

export interface MovieAction extends Action {
    type: MOVIE_ACTIONS,
    payload: Movie[] | Poster[]
}

export enum MOVIE_ACTIONS {
    SET_MOVIES = "movies/set",
    SET_POSTERS = "movies/set/posters",
    SET_SERIES = "movies/set/series"
}
