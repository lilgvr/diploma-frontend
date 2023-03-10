import { USER_ACTIONS, UserAction } from "../../actions/UserAction";
import { AuthResponse } from "../../../models";

export const UserActionLogIn = (payload: AuthResponse): UserAction => {
    return {
        type: USER_ACTIONS.LOG_IN,
        payload
    }
}
