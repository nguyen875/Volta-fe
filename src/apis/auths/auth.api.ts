import axios, { type AxiosResponse } from "axios";
import type { RequestLoginDto, RequestSignUpDto } from "./auth.interface";
import type { User } from "../users/user.interface";

export const login = (request: RequestLoginDto): Promise<AxiosResponse<User>> => {
    return axios.post(`/login`, request);
}

export const signUp = (request: RequestSignUpDto): Promise<AxiosResponse<User>> => {
    return axios.post(`/register`, request);
}

export const logout = () => {
    return axios.post(`/logout`);
}

export const me = () => {
    return axios.get<AxiosResponse<User>>(`/me`);
}