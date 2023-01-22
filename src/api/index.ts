import axios, { CreateAxiosDefaults } from "axios";

export const API_URL = '//localhost:8000/api';
export const IMG_URL = '//localhost:8000/static/images';

const apiOptions: CreateAxiosDefaults = {
    withCredentials: true,
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
}

export const $api = axios.create(apiOptions);

export const $cleanApi = axios.create(apiOptions);

$api.interceptors.request.use(config => {
    const accessToken: string = localStorage.getItem('access-token') ?? "";

    if (accessToken) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${ accessToken }`;
    }

    return config;
}, error => {
    return Promise.reject(error);
})
