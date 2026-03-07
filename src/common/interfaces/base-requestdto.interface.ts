export interface BaseRequestDto {
    [key: string]: unknown;
    keySearch?: string;
    sortBy?: string;
    sortDescending?: boolean;
    fromDate?: string;
    toDate?: string;
    count?: number;
    skip?: number;
}

export interface PaginatedResponse<T> {
    items: T[];
    totalCount: number;
    pageIndex: number;
    pageSize: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}