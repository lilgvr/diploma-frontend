import { Action } from "redux";

export interface MainTabAction extends Action {
    type: MAIN_TAB_ACTIONS,
    payload: number
}

export enum MAIN_TAB_ACTIONS {
    SET = "tabs/set"
}
