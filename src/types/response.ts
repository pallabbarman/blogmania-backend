export interface ApiResponseType<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
}
