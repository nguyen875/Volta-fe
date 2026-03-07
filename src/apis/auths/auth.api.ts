import axios, { type AxiosResponse } from "axios";
import type { RequestLoginDto, RequestSignUpDto, ResponseLoginDto } from "./auth.interface";
import type { User } from "../users/user.interface";

export const login = (request: RequestLoginDto) => {
    return axios.post<ResponseLoginDto>(`/login`, request);
}

export const signUp = (request: RequestSignUpDto) => {
    return axios.post<ResponseLoginDto>(`/register`, request);
}

export const logout = () => {
    return axios.post(`/logout`);
}

export const me = () => {
    return axios.get<AxiosResponse<User>>(`/me`);
}