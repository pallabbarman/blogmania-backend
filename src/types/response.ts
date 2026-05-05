export interface ApiResponseType<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
}

export interface ApiErrorResponseType {
    statusCode: number;
    success: boolean;
    message: string;
    errors?: unknown[] | undefined;
}
