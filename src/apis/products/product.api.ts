import type { AxiosResponse } from "axios";
import axiosInstance from "../../common/configs/axios.config";
import type { CreateProductRelationDTO, Product, ProductImage, ProductRequestParam, RequestCreateProductDto } from "./product.interface";
import type { PaginatedResponse } from "../../common/interfaces/base-requestdto.interface";
import type { ProductRelationType } from "./product.enum";

const BASE_URL = 'products';

export const getProductById = (id: string): Promise<AxiosResponse<Product>> => {
    return axiosInstance.get(`${BASE_URL}/${id}`);
}

export const getAllProduct = (params?: ProductRequestParam): Promise<AxiosResponse<PaginatedResponse<Product>>> => {
    return axiosInstance.get(`${BASE_URL}`, {
        params: {
            search: params?.search || '',
            page: params?.page || 1,
            limit: params?.limit || 10
        }
    });
}

export const createProduct = (product: RequestCreateProductDto): Promise<AxiosResponse<Product>> => {
    return axiosInstance.post(`${BASE_URL}`, product);
}

export const updateProduct = (id: string, product: RequestCreateProductDto): Promise<AxiosResponse<Product>> => {
    return axiosInstance.put(`${BASE_URL}/${id}`, product);
}

export const deleteProduct = (id: string): Promise<AxiosResponse<void>> => {
    return axiosInstance.delete(`${BASE_URL}/${id}`);
}

export const getAllProductImage = (id: string): Promise<AxiosResponse<ProductImage[]>> => {
    return axiosInstance.get(`${BASE_URL}/${id}/images`);
}

export const uploadProductImage = (id: string, imaged: File[]): Promise<AxiosResponse<ProductImage[]>> => {
    const formData = new FormData();
    imaged.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
    });
    return axiosInstance.post(`${BASE_URL}/${id}/images`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export const deleteProductImage = (id: string, imageId: string): Promise<AxiosResponse<void>> => {
    return axiosInstance.delete(`${BASE_URL}/${id}/images/${imageId}`);
}

export const setProductImagePrimary = (id: string, imageId: string): Promise<AxiosResponse<void>> => {
    return axiosInstance.put(`${BASE_URL}/${id}/images/${imageId}/primary`);
}

export const getProductRelations = (id: string, type: ProductRelationType): Promise<AxiosResponse<Product[]>> => {
    return axiosInstance.get(`${BASE_URL}/${id}/relations`, {
        params: {
            type: type
        }
    });
}

export const createProductRelation = (id: string, body: CreateProductRelationDTO): Promise<AxiosResponse<void>> => {
    return axiosInstance.post(`${BASE_URL}/${id}/relations`, body);
}

export const deleteProductRelation = (id: string, related_id: string): Promise<AxiosResponse<void>> => {
    return axiosInstance.delete(`${BASE_URL}/${id}/relations/${related_id}`);
}