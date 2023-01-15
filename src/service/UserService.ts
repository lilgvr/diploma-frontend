import { $api } from "../api";
import { User } from "../models/user";

export const getUserById = (id: number) => {
    return $api.get<User>(`/users/user/${ id }`)
}
