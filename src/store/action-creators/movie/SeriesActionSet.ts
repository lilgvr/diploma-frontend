import { Movie } from "../../../models";
import { MOVIE_ACTIONS, MovieAction } from "../../actions/MovieAction";

export const SeriesActionSet = (payload: Movie[]): MovieAction => {
    return {
        type: MOVIE_ACTIONS.SET_SERIES,
        payload
    }
}
