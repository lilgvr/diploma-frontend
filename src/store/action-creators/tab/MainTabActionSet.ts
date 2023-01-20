import { MAIN_TAB_ACTIONS } from "../../actions/MainTabAction";

export const MainTabActionSet = (payload: number) => {
    return {
        type: MAIN_TAB_ACTIONS.SET,
        payload
    }
}
