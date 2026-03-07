import type { BaseRequestDto } from "../../common/interfaces/base-requestdto.interface";
import type { BaseDto } from "../../common/interfaces/basedto.interface";

export interface OrderItem extends BaseDto{
    orderId: string;
    dishId: string;
    quantity: number;
    totalPrice: number;
    specialInstructions: string;
}

export interface RequestCreateOrderItemDto {
    orderId: string;
    dishId: string;
    quantity: number;
    specialInstructions: string;
}
export interface RequestUpdateOrderItemDto extends RequestCreateOrderItemDto {
    id: string;
}

export type RequestOrderItemDto = BaseRequestDto;