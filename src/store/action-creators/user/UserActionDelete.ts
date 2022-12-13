import { AuthorizedUser } from "../../../models/user";
import { USER_ACTIONS, UserAction } from "../../actions/UserAction";

export const UserActionDelete = (payload: AuthorizedUser): UserAction => {
    return {
        type: USER_ACTIONS.DELETE,
        payload
    }
}
