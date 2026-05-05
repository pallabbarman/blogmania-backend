import { Response } from 'express';
import { ApiErrorResponseType, ApiResponseType } from 'types/response';

export const sendResponse = <T>(res: Response, data: ApiResponseType<T>): void => {
    const responseData: ApiResponseType<T> = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message,
        data: data.data,
    };

    res.status(data.statusCode).json(responseData);
};

export const errorResponse = (
    statusCode: number,
    message: string,
    errors?: unknown[] | undefined
): ApiErrorResponseType => ({
    statusCode,
    success: false,
    message,
    errors,
});
