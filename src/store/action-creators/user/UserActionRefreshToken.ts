import { USER_ACTIONS, UserAction } from "../../actions/UserAction";
import { TokenType } from "../../types";

export const UserActionRefreshToken = (payload: TokenType): UserAction => {
    return {
        type: USER_ACTIONS.REFRESH_TOKENS,
        payload
    }
}
