import { UserAction } from "./actions/UserAction";
import { MovieAction } from "./actions/MovieAction";
import { AuthorizedUser } from "../models/user";

export type MainState = {}

export type UserState = {
    user: AuthorizedUser | null,
    access_token: TokenType | null,
    session_id: string | null,
    logged_in: boolean,
}

export type MovieState = {
    movies: Movie[]
}

export type TokenType = {
    expires: Date,
    value: string | null
}

export type Movie = {
    id: number,
    title: string,
    premiere_date: Date,
    description: string,
    rating: number,
    genre_id: number,
    country_id: number,
    poster_id?: number
}

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

export type AppAction = UserAction | MovieAction;

