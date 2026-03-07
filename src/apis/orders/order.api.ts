import axios from "axios";
import type { Order, RequestOrderDto, RequestUpdateOrderDto } from "./order.interface";

const BASE_URL = "orders";

export const getOrderById = (id: string) => {
    return axios.get<Order>(`${BASE_URL}/${id}`);
};

export const getOrderList = (request: RequestOrderDto) => {
    return axios.get<Order[]>(`${BASE_URL}`, { params: request });
};

export const getOrderListByOrderId = (orderId: string) => {
    return axios.get<Order[]>(`${BASE_URL}/by-order/${orderId}`);
};

export const createOrder = (request: RequestOrderDto) => {
    return axios.post<Order>(`${BASE_URL}`, request);
};

export const createBulkOrder = (requests: RequestOrderDto[]) => {
    return axios.post<Order[]>(`${BASE_URL}/bulk`, requests);
};

export const updateOrder = (request: RequestUpdateOrderDto) => {
    return axios.put<Order>(`${BASE_URL}`, request);
};

export const deleteOrder = (id: string) => {
    return axios.delete<Order>(`${BASE_URL}/${id}`);
};

export const deleteBulkOrder = (ids: string[]) => {
    return axios.delete<Order[]>(`${BASE_URL}/bulk`, { data: ids })
};