import type { AxiosResponse } from "axios";
import axiosInstance from "../../common/configs/axios.config";
import type { PaginatedResponse } from "../../common/interfaces/base-requestdto.interface";
import type { Bundle, BundleItem, BundleRequestParam, RequestCreateBundleDto } from "./bundle.interface";

const BASE_URL = "/bundles";

export const getAllBundles = (param: BundleRequestParam): Promise<AxiosResponse<PaginatedResponse<Bundle>>> => {
    return axiosInstance.get(BASE_URL, {
        params: {
            search: param.search || '',
            page: param.page || 1,
            limit: param.limit || 10
        }
    });
}

export const getActiveBundles = (): Promise<AxiosResponse<Bundle[]>> => {
    return axiosInstance.get(`${BASE_URL}/active`);
}

export const getBundleById = (id: number): Promise<AxiosResponse<Bundle>> => {
    return axiosInstance.get(`${BASE_URL}/${id}`);
}

export const createBundle = (body: RequestCreateBundleDto): Promise<AxiosResponse<Bundle>> => {
    return axiosInstance.post(BASE_URL, body);
}

export const updateBundle = (id: number, body: RequestCreateBundleDto): Promise<AxiosResponse<Bundle>> => {
    return axiosInstance.put(`${BASE_URL}/${id}`, body);
}

export const deleteBundle = (id: number): Promise<AxiosResponse<void>> => {
    return axiosInstance.delete(`${BASE_URL}/${id}`);
}

export const getBundleItems = (id: number): Promise<AxiosResponse<BundleItem[]>> => {
    return axiosInstance.get(`${BASE_URL}/${id}/items`);
}

export const addBundleItem = (id: number, body: { product_id: number }): Promise<AxiosResponse<BundleItem>> => {
    return axiosInstance.post(`${BASE_URL}/${id}/items`, body);
}

export const removeBundleItem = (id: number, itemId: number): Promise<AxiosResponse<void>> => {
    return axiosInstance.delete(`${BASE_URL}/${id}/items/${itemId}`);
}