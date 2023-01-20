import { $api } from "../index";

export const getAllPosters = async () => {
    const res = await $api.get('/posters/all');

    return res.data ?? [];
}
