import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import HttpError from 'errors/httpError';
import { NextFunction, Request, Response } from 'express';
import status from 'http-status';
import jwt from 'jsonwebtoken';
import { errorLogger } from 'utils/logger';
import { errorResponse } from 'utils/response';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof HttpError) {
        return res
            .status(err.statusCode)
            .json(errorResponse(err.statusCode, err.message, err.errors));
    }

    if (err instanceof jwt.TokenExpiredError) {
        return res
            .status(status.UNAUTHORIZED)
            .json(errorResponse(status.UNAUTHORIZED, 'Token has expired'));
    }

    if (err instanceof jwt.JsonWebTokenError) {
        return res
            .status(status.UNAUTHORIZED)
            .json(errorResponse(status.UNAUTHORIZED, 'Invalid token'));
    }

    if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
            return res
                .status(status.NOT_FOUND)
                .json(errorResponse(status.NOT_FOUND, 'Record not found'));
        }

        if (err.code === 'P2002') {
            return res
                .status(status.CONFLICT)
                .json(errorResponse(status.CONFLICT, 'Duplicate entry'));
        }
    }

    errorLogger.error(`${err.message}`, { stack: err.stack });
    return res
        .status(status.INTERNAL_SERVER_ERROR)
        .json(errorResponse(status.INTERNAL_SERVER_ERROR, 'Internal server error'));
};

export default errorHandler;
