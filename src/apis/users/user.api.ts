import type { AxiosResponse } from "axios";
import axiosInstance from "../../common/configs/axios.config";
import type { User, RequestCreateUserDto, RequestUpdateUserDto, UserRequestParam } from "./user.interface";
import type { PaginatedResponse } from "../../common/interfaces/base-requestdto.interface";

const BASE_URL = 'users';

export const getUserById = (id: string): Promise<AxiosResponse<User>> => {
    return axiosInstance.get(`${BASE_URL}/${id}`);
}

export const getAllUser = (param: UserRequestParam): Promise<AxiosResponse<PaginatedResponse<User>>> => {
    return axiosInstance.get(`${BASE_URL}`, {
        params: {
            search: param.search || '',
            page: param.page || 1,
            limit: param.limit || 10
        }
    });
}

export const createUser = (user: RequestCreateUserDto): Promise<AxiosResponse<User>> => {
    return axiosInstance.post(`${BASE_URL}`, user);
}

export const updateUser = (id: string, user: RequestUpdateUserDto): Promise<AxiosResponse<User>> => {
    return axiosInstance.put(`${BASE_URL}/${id}`, user);
}

export const deleteUser = (id: string): Promise<AxiosResponse<void>> => {
    return axiosInstance.delete(`${BASE_URL}/${id}`);
}
