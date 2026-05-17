export interface PaginationMetaType {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export interface PaginationResponseType<T> {
    statusCode: number;
    success: boolean;
    message: string;
    meta: PaginationMetaType;
    data: T[];
}
