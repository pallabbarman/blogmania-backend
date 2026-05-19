import status from 'http-status';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { sendResponse } from '../../utils/response.js';
import { requiredField } from '../../utils/validate.js';
import { rotateRefreshToken, signIn, signOut, signUp } from './service.js';
export const register = asyncHandler(async (req, res) => {
    const result = await signUp(req.body);
    sendResponse(res, {
        statusCode: status.CREATED,
        success: true,
        message: 'User registered successfully',
        data: result,
    });
});
export const login = asyncHandler(async (req, res) => {
    const result = await signIn(req.body);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Login successful',
        data: result,
    });
});
export const refreshToken = asyncHandler(async (req, res) => {
    const data = await rotateRefreshToken(req.body.refreshToken);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Token refreshed',
        data,
    });
});
export const logout = asyncHandler(async (req, res) => {
    await signOut(requiredField(req.user.userId, 'User id'));
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Logged out successfully',
        data: null,
    });
});
