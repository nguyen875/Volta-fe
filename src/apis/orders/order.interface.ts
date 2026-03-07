import type { BaseDto } from "../../common/interfaces/basedto.interface";
import type { OrderItem } from "../order-items/order-item.interface";
import type { BaseRequestDto } from "../../common/interfaces/base-requestdto.interface";
import { OrderStatusEnum, OrderTypeEnum } from "./order.enum";

export interface Order extends BaseDto {
    OrderCode: string 
    TableId: string 
    TotalAmount: number 
    Status: OrderStatusEnum 
    OrderType: OrderTypeEnum 
    OrderItems: OrderItem[] 
    Note: string 
}

export interface RequestCreateOrderDto
{
    OrderCode: string 
    TableId: string 
    Status: OrderStatusEnum 
    OrderType: OrderTypeEnum 
}

export interface RequestUpdateOrderDto extends RequestCreateOrderDto {
    id: string;
}

export type RequestOrderDto = BaseRequestDto