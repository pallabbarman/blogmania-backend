import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import HttpError from 'errors/httpError';
import { NextFunction, Request, Response } from 'express';
import status from 'http-status';
import { errorResponse } from 'utils/response';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof HttpError) {
        return res
            .status(err.statusCode)
            .json(errorResponse(err.statusCode, err.message, err.errors));
    }

    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
        return res.status(404).json(errorResponse(status.NOT_FOUND, err.message));
    }

    return res
        .status(status.INTERNAL_SERVER_ERROR)
        .json(errorResponse(status.INTERNAL_SERVER_ERROR, 'Internal server error'));
};

export default errorHandler;
