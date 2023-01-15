import { AuthorizedUser } from "../user";
import { TokenType } from "../../store/types";

export interface AuthResponse {
    access_token: TokenType,
    session_id: string,
    user: AuthorizedUser
}
