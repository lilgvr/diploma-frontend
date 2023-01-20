import { MOVIE_ACTIONS, MovieAction } from "../../actions/MovieAction";
import { Movie } from "../../../models/movie/Movie";

export const MovieActionSet = (payload: Movie[]): MovieAction => {
    return {
        type: MOVIE_ACTIONS.SET_MOVIES,
        payload
    }
}
