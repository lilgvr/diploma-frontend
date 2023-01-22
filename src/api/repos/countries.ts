import { Country } from "../../models/movie/Country";
import { $api } from "../index";

export const getAllCountries = async (): Promise<Country[]> => {
    const res = await $api.get('/countries/all');

    return res.data ?? [];
}
