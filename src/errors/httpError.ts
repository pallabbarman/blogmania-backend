class HttpError extends Error {
    statusCode: number;
    errors?: unknown[] | undefined;

    constructor(statusCode: number, message: string, errors?: unknown[] | undefined) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default HttpError;
