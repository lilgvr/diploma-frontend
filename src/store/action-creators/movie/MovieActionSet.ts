import { Movie } from "../../types";
import { MOVIE_ACTIONS, MovieAction } from "../../actions/MovieAction";

export const MovieActionSet = (payload: Movie[]): MovieAction => {
    return {
        type: MOVIE_ACTIONS.SET_MOVIES,
        payload
    }
}
