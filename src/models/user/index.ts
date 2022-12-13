export type User = {
    id: number,
    name: string,
    birth_date: Date,
    country_id: number,
    sex: number,
    activated: boolean
}

export type UserCredentials = {
    id?: number,
    email: string,
    username: string,
    hashed_password: string,
    user_id: number,
    access_token: string | null,
    activation_link: string | null,
}

export type AuthorizedUser = Omit<User, "activated"> & Pick<UserCredentials, "email" | "username">
