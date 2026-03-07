import type { BaseRequestParam } from "../../common/interfaces/base-requestdto.interface";
import type { OrderStatus } from "./order.enum";

export interface Order {
  id?: number;
  user_id?: number;
  address_id?: number;
  status: OrderStatus;
  total_price: number;
  create_at?: string;
  items?: OrderItem[];
}

export interface RequestCreateOrderDto {
  user_id: number;
  address_id: number;
  status: OrderStatus;
  total_price: number;
}

export interface RequestUpdateOrderDto {
  status?: OrderStatus;
  address_id?: number;
  total_price?: number;
}

export interface OrderRequestParam extends BaseRequestParam {
  status?: OrderStatus;
}

export interface CreateOrderResponse {
  user_id: number;
  address_id: number;
  status: OrderStatus;
  total_price: number;
  items: CreateOrderItemDto[];
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
}

export interface CreateOrderItemDto {
  product_id: number;
  quantity: number;
  unit_price: number;
}
