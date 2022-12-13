import { Action } from "redux";
import { AuthorizedUser, User } from "../../models/user";
import { AuthResponse } from "../../models/response/AuthResponse";
import { TokenType } from "../types";

export interface UserAction extends Action {
    type: USER_ACTIONS,
    payload: User | AuthorizedUser | AuthResponse | TokenType | undefined
}

export enum USER_ACTIONS {
    LOG_IN = "user/login",
    LOG_OUT = "user/logout",
    REFRESH_TOKENS = "user/refresh-tokens",
    DELETE = "user/delete"
}
