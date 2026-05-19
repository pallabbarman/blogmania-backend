import status from 'http-status';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { parsePaginationQuery } from '../../utils/pagination.js';
import { sendPaginatedResponse, sendResponse } from '../../utils/response.js';
import { requiredField } from '../../utils/validate.js';
import { findAllUsers, findUser, patchUser, removeUser } from './service.js';
export const getAllUsers = asyncHandler(async (req, res) => {
    const query = parsePaginationQuery(req);
    const { meta, users } = await findAllUsers(query);
    sendPaginatedResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Users retrieved successfully!',
        data: users,
        meta,
    });
});
export const getUser = asyncHandler(async (req, res) => {
    const id = requiredField(req.params.id, 'Id');
    const user = await findUser(id);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'User retrieved successfully!',
        data: user,
    });
});
export const updateUser = asyncHandler(async (req, res) => {
    const id = requiredField(req.params.id, 'Id');
    const user = await patchUser(id, req.body);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'User data updated successfully!',
        data: user,
    });
});
export const deleteUser = asyncHandler(async (req, res) => {
    const id = requiredField(req.params.id, 'Id');
    const result = await removeUser(id);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'User deleted successfully!',
        data: result,
    });
});
