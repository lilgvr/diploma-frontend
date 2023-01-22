import { MOVIE_ACTIONS, MovieAction } from "../../actions/MovieAction";
import { Director } from "../../../models";

export const DirectorsActionSet = (payload: Director[]): MovieAction => {
    return {
        type: MOVIE_ACTIONS.SET_DIRECTORS,
        payload
    }
}
