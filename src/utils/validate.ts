import HttpError from 'errors/httpError';
import { NextFunction, Request, Response } from 'express';
import status from 'http-status';
import { ZodType } from 'zod';

export const requiredField = (value: unknown, fieldName: string): string => {
    if (!value || typeof value !== 'string') {
        throw new HttpError(status.NOT_FOUND, `${fieldName} is required`);
    }

    return value;
};

export const validateSchema =
    (schema: ZodType) => (req: Request, _res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            throw new HttpError(400, 'Validation error', result.error.issues);
        }

        req.body = result.data;
        next();
    };
