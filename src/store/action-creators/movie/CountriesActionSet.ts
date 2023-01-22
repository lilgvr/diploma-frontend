import { Country } from "../../../models/movie/Country";
import { MOVIE_ACTIONS, MovieAction } from "../../actions/MovieAction";

export const CountriesActionSet = (payload: Country[]): MovieAction => {
    return {
        type: MOVIE_ACTIONS.SET_COUNTRIES,
        payload
    }
}
