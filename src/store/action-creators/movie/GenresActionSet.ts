import { Genre } from "../../../models";
import { MOVIE_ACTIONS, MovieAction } from "../../actions/MovieAction";

export const GenresActionSet = (payload: Genre[]): MovieAction => {
    return {
        type: MOVIE_ACTIONS.SET_GENRES,
        payload
    }
}
