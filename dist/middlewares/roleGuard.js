import HttpError from '../errors/httpError.js';
import status from 'http-status';
const roleGuard = (...allowedRoles) => (req, _res, next) => {
    if (!req.user) {
        return next(new HttpError(status.UNAUTHORIZED, 'Unauthorized'));
    }
    if (req.user?.role && !allowedRoles.includes(req.user.role)) {
        return next(new HttpError(status.FORBIDDEN, 'Forbidden: insufficient permissions'));
    }
    next();
};
export default roleGuard;
