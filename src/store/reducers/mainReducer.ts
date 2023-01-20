import { AppAction, MainState } from "../types";
import { MAIN_TAB_ACTIONS } from "../actions/MainTabAction";

export const initialState: MainState = {
    mainSelectedTab: 0,
    userSelectedTab: 0,
    currentPage: "home"
}

export const mainReducer = (state: MainState = initialState, action: AppAction): MainState => {
    switch (action.type) {
        case MAIN_TAB_ACTIONS.SET:
            return { ...state, mainSelectedTab: action.payload }
        default:
            return state;
    }
}
