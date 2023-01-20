import { UserAction } from "./actions/UserAction";
import { MovieAction } from "./actions/MovieAction";
import { AuthorizedUser, Movie, Poster } from "../models";
import { MainTabAction } from "./actions/MainTabAction";

export type MainState = {
    mainSelectedTab: number,
    userSelectedTab: number,
    currentPage: string
}

export type UserState = {
    user: AuthorizedUser | null,
    access_token: TokenType | null,
    session_id: string | null,
    logged_in: boolean,
}

export type MovieState = {
    movies: Movie[],
    series: Movie[],
    posters: Poster[]
}

export type TokenType = {
    expires: Date,
    value: string | null
}

/*export type Movie = {
    id: number,
    title: string,
    premiere_date: Date,
    description: string,
    rating: number,
    genre_id: number,
    country_id: number,
    poster_id?: number
}*/

export type Genre = {
    id: number,
    title: string
}

export type Room = {
    id: number,
    creator_id: number,
    name: string
}

export type RoomUser = {
    id: number,
    room_id: number,
    user_id: number,
    is_creator: boolean
}

export type MovieComment = {
    id: number,
    movie_id: number,
    comment: string,
    author_id: number,
    datetime: string
}

export type AppAction = UserAction | MovieAction | MainTabAction;

