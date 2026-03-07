import type { AxiosResponse } from "axios";
import type { Category, RequestCreateCategoryDto } from "./category.interface";
import axiosInstance from "../../common/configs/axios.config";

const BASE_URL = "/categories";

export const getAllCategories = (): Promise<AxiosResponse<Category[]>> => {
    return axiosInstance.get(BASE_URL);
}

export const createCategory = (body: RequestCreateCategoryDto): Promise<AxiosResponse<Category>> => {
    return axiosInstance.post(BASE_URL, body);
}

export const getCategoryById = (id: number): Promise<AxiosResponse<Category>> => {
    return axiosInstance.get(`${BASE_URL}/${id}`);
}

export const updateCategory = (id: number, body: RequestCreateCategoryDto): Promise<AxiosResponse<Category>> => {
    return axiosInstance.put(`${BASE_URL}/${id}`, body);
}

export const deleteCategory = (id: number): Promise<AxiosResponse<void>> => {
    return axiosInstance.delete(`${BASE_URL}/${id}`);
}