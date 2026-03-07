import type { BaseRequestParam } from "../../common/interfaces/base-requestdto.interface";

export interface Bundle {
  id: number;
  name: string;
  description: string;
  bundle_price: number;
  is_active: boolean;
}

export interface RequestCreateBundleDto {
  name: string;
  description: string;
  bundle_price: number;
  is_active: boolean;
  product_ids: number[];
}

export interface BundleItem {
  id: number;
  bundle_id: number;
  product_id: number;
}


export type BundleRequestParam = BaseRequestParam;