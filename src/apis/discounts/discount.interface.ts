import type { DiscountType } from "./discount.enum";

export interface Discount {
  id: number;
  code: string;
  type: DiscountType;
  value: number;
  min_order: number;
  uses_remaining: number | null;
  expires_at: Date | null;
}

export interface RequestCreateDiscountDto {
  code: string;
  type: DiscountType;
  value: number;
  min_order: number;
  uses_remaining?: number | null;
  expires_at?: Date | null;
}
