import { Genre } from "../../models";
import { $api } from "../index";

export const getAllGenres = async (): Promise<Genre[]> => {
    const res = await $api.get('/genres/all');

    return res.data ?? [];
}
