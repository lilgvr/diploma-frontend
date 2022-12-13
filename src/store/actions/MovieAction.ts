import { Action } from "redux";
import { Movie } from "../types";

export interface MovieAction extends Action {
    type: MOVIE_ACTIONS,
    payload: Movie[]
}

export enum MOVIE_ACTIONS {
    SET_MOVIES = "movies/set"
}
