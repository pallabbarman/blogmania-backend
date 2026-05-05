import HttpError from 'errors/httpError';
import status from 'http-status';

export const requiredField = (value: unknown, fieldName: string): string => {
    if (!value || typeof value !== 'string') {
        throw new HttpError(status.NOT_FOUND, `${fieldName} is required`);
    }

    return value;
};
