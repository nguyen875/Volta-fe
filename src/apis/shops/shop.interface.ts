import type { ApiResponse } from "../../common/interfaces/base-requestdto.interface";
import type { BaseRequestParam } from "../../common/interfaces/base-requestdto.interface";
import type { Product, ProductImage } from "../products/product.interface";

export interface ShopRequestParam extends BaseRequestParam {
    category_id?: number;
}

export interface ProductDetail {
    product: Product;
    images: ProductImage[];
}

export interface ShopPaginationMeta {
    page: number;
    limit: number;
    total: number;
    images?: Record<string, ProductImage>;
}

export interface ShopProductResponse extends ApiResponse<Product[]> {
    pagination: ShopPaginationMeta;
}

export interface FeaturedBadge {
    badge?: string;
    limit?: number;
}