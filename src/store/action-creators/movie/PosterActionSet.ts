import { Poster } from "../../../models";
import { MOVIE_ACTIONS, MovieAction } from "../../actions/MovieAction";

export const PosterActionSet = (payload: Poster[]): MovieAction => {
    return {
        type: MOVIE_ACTIONS.SET_POSTERS,
        payload
    }
}
