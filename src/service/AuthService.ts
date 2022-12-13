import { $api, $cleanApi } from "../http";
import { AuthResponse } from "../models/response/AuthResponse";

type RegisterData = {
    name: string,
    birthDate: string,
    countryId: number,
    sex: number,
    email: string,
    username: string,
    password: string
}

export const login = async (loginData: string, password: string) => {
    return $api.post<AuthResponse>('/auth/login', { loginData, password });
}

export const register = async (data: RegisterData) => {
    return $api.post<AuthResponse>('/auth/register', data);
}

export const logout = async (user_id: number) => {
    return $api.post('/auth/logout', { user_id });
}

export const deleteUser = async (user_id?: number) => {
    if (!user_id) return;
    return $api.delete('/auth/delete', { data: { user_id } })
}

export const updateTokens = async () => {
    return $cleanApi.post('/auth/refresh');
}
