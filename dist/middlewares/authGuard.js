import HttpError from '../errors/httpError.js';
import status from 'http-status';
import { verifyAccessToken } from '../utils/jwt.js';
import { errorLogger } from '../utils/logger.js';
const authGuard = (req, _res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new HttpError(status.UNAUTHORIZED, 'Unauthorized'));
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = verifyAccessToken(token);
        req.user = decoded;
        next();
    }
    catch (err) {
        errorLogger.warn(`Auth failure [${req.method} ${req.url}]: ${err.message}`);
        next(new HttpError(status.UNAUTHORIZED, 'Invalid or expired token'));
    }
};
export default authGuard;
