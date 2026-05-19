import HttpError from '../errors/httpError.js';
import status from 'http-status';
export const requiredField = (value, fieldName) => {
    if (!value || typeof value !== 'string') {
        throw new HttpError(status.BAD_REQUEST, `${fieldName} is required`);
    }
    return value;
};
export const validateSchema = (schema) => (req, _res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        return next(new HttpError(400, 'Validation error', result.error.issues));
    }
    req.body = result.data;
    next();
};
