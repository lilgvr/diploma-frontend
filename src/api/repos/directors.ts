import { Director } from "../../models";
import { $api } from "../index";

export const getAllDirectors = async (): Promise<Director[]> => {
    const res = await $api.get('/directors/all');

    return res.data ?? [];
}
