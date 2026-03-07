import axios from "axios";
import type { OrderItem, RequestCreateOrderItemDto, RequestOrderItemDto, RequestUpdateOrderItemDto } from "./order-item.interface";

const BASE_URL = "order-items";

export const getOrderItemById = (id: string) => {
    return axios.get<OrderItem>(`${BASE_URL}/${id}`);
};

export const getOrderItems = (request: RequestOrderItemDto) => {
    return axios.get<OrderItem[]>(`${BASE_URL}`, { params: request });
};

export const getOrderItemsByOrderId = (orderId: string) => {
    return axios.get<OrderItem[]>(`${BASE_URL}/by-order/${orderId}`);
};

export const createOrderItem = (request: RequestCreateOrderItemDto) => {
    return axios.post<OrderItem>(`${BASE_URL}`, request);
};

export const createBulkOrderItem = (requests: RequestCreateOrderItemDto[]) => {
    return axios.post<OrderItem[]>(`${BASE_URL}/bulk`, requests);
};

export const updateOrderItem = (request: RequestUpdateOrderItemDto) => {
    return axios.put<OrderItem>(`${BASE_URL}`, request);
};

export const deleteOrderItem = (id: string) => {
    return axios.delete<OrderItem>(`${BASE_URL}/${id}`);
};

export const deleteBulkOrderItem = (ids: string[]) => {
    return axios.delete<OrderItem[]>(`${BASE_URL}/bulk`, { data: ids });
};