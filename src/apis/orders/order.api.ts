import type { AxiosResponse } from "axios";
import type { CreateOrderResponse, Order, OrderRequestParam, OrderStat, RequestCreateOrderDto, RequestUpdateOrderDto } from "./order.interface";
import type { PaginatedResponse, ApiResponse } from "../../common/interfaces/base-requestdto.interface";
import axiosInstance from "../../common/configs/axios.config";
import type { OrderStatus } from "./order.enum";

const BASE_URL = "/orders";

export const getAllOrder = (params?: OrderRequestParam): Promise<AxiosResponse<PaginatedResponse<Order>>> => {
    return axiosInstance.get(BASE_URL, { params });
}

export const createOrder = (body: RequestCreateOrderDto): Promise<AxiosResponse<ApiResponse<CreateOrderResponse>>> => {
    return axiosInstance.post(BASE_URL, body);
}

export const getOrderById = (id: string): Promise<AxiosResponse<ApiResponse<Order>>> => {
    return axiosInstance.get(`${BASE_URL}/${id}`);
}

export const updateOrder = (id: string, body: RequestUpdateOrderDto): Promise<AxiosResponse<ApiResponse<Order>>> => {
    return axiosInstance.put(`${BASE_URL}/${id}`, body);
}

export const updateOrderStatus = (id: string, status: OrderStatus): Promise<AxiosResponse<ApiResponse<Order>>> => {
    return axiosInstance.put(`${BASE_URL}/${id}/status`, { status });
}

export const deleteOrder = (id: string): Promise<AxiosResponse<ApiResponse<void>>> => {
    return axiosInstance.delete(`${BASE_URL}/${id}`);
}

export const getOrderStats = (startDate: string, endDate: string): Promise<AxiosResponse<ApiResponse<OrderStat>>> => {
    return axiosInstance.get(`${BASE_URL}/stats`, { params: { start_date: startDate, end_date: endDate } });
}