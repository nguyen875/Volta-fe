import axiosInstance from "../../common/configs/axios.config";
import type { ApiResponse } from "../../common/interfaces/base-requestdto.interface";
import type { Discount, RequestCreateDiscountDto } from "./discount.interface";

const BASE_URL = "/discounts";

export const getAllDiscounts = (): Promise<ApiResponse<Discount[]>> => {
    return axiosInstance.get(BASE_URL);
}

export const getDiscountById = (id: number): Promise<ApiResponse<Discount>> => {
    return axiosInstance.get(`${BASE_URL}/${id}`);
}

export const createDiscount = (body: RequestCreateDiscountDto): Promise<ApiResponse<Discount>> => {
    return axiosInstance.post(BASE_URL, body);
}

export const updateDiscount = (id: number, body: RequestCreateDiscountDto): Promise<ApiResponse<Discount>> => {
    return axiosInstance.put(`${BASE_URL}/${id}`, body);
}

export const deleteDiscount = (id: number): Promise<ApiResponse<void>> => {
    return axiosInstance.delete(`${BASE_URL}/${id}`);
}

export const getCurrentDiscounts = (): Promise<ApiResponse<Discount[]>> => {
    return axiosInstance.get(`${BASE_URL}/valid`);
}