import { TokenType, UserState } from "../types";
import { USER_ACTIONS, UserAction } from "../actions/UserAction";
import { AuthResponse } from "../../models";

const initialUserState: UserState = {
    user: null,
    session_id: null,
    logged_in: false,
    access_token: null
}

export const userReducer = (state: UserState = initialUserState, action: UserAction): UserState => {
    switch (action.type) {
        case USER_ACTIONS.LOG_IN:
            const payload = action.payload as AuthResponse;

            return {
                ...state,
                user: payload.user,
                access_token: payload.access_token,
                session_id: payload.session_id,
                logged_in: true
            }
        case USER_ACTIONS.LOG_OUT:
            localStorage.removeItem('username');
            localStorage.removeItem('access-token');
            localStorage.removeItem('access-token/expires-in');

            return {
                ...state,
                user: null,
                access_token: {
                    expires: new Date(0),
                    value: null
                },
                session_id: null,
                logged_in: false
            }
        case USER_ACTIONS.REFRESH_TOKENS:
            const token = action.payload as TokenType;

            localStorage.setItem('access-token', token.value as string)
            localStorage.setItem('access-token/expires-in', JSON.stringify(token.expires));
            return {
                ...state,
                access_token: token
            }
        default:
            return state;
    }
}
