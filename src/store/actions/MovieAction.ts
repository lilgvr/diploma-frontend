import { Action } from "redux";
import { Country, Director, Genre, Movie, Poster } from "../../models";

export interface MovieAction extends Action {
    type: MOVIE_ACTIONS,
    payload: Movie[] | Poster[] | Country[] | Genre[] | Director[]
}

export enum MOVIE_ACTIONS {
    SET_MOVIES = "movies/set",
    SET_SERIES = "movies/set/series",
    SET_COUNTRIES = "movies/set/countries",
    SET_GENRES = "movies/set/genres",
    SET_DIRECTORS ="movies/set/directors"
}
