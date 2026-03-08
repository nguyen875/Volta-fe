import type { RequestLoginDto, RequestSignUpDto } from "./auth.interface";
import type { User } from "../users/user.interface";
import axiosInstance from "../../common/configs/axios.config";
import type { ApiResponse } from "../../common/interfaces/base-requestdto.interface";

export const login = (request: RequestLoginDto): Promise<ApiResponse<User>> => {
    return axiosInstance.post(`/login`, request);
}

export const signUp = (request: RequestSignUpDto): Promise<ApiResponse<User>> => {
    return axiosInstance.post(`/register`, request);
}

export const logout = () => {
    return axiosInstance.post(`/logout`);
}

export const me = () => {
    return axiosInstance.get<ApiResponse<User>>(`/me`);
}