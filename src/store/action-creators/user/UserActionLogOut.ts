import { AuthResponse } from "../../../models/response/AuthResponse";
import { USER_ACTIONS, UserAction } from "../../actions/UserAction";

export const UserActionLogOut = (payload?: AuthResponse): UserAction => {
    return {
        type: USER_ACTIONS.LOG_OUT,
        payload
    }
}
