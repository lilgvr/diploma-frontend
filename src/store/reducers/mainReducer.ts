import { AppAction, MainState } from "../types";

export const initialState: MainState = {

}

export const mainReducer = (state: MainState = initialState, action: AppAction): MainState => {
    switch (action.type) {
        default:
            return state;
    }
}
