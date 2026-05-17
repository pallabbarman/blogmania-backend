import { User } from 'generated/prisma/client';
import status from 'http-status';
import { asyncHandler } from 'utils/asyncHandler';
import { parsePaginationQuery } from 'utils/pagination';
import { sendPaginatedResponse, sendResponse } from 'utils/response';
import { requiredField } from 'utils/validate';
import { findAllUsers, findUser, patchUser, removeUser } from './service';

export const getAllUsers = asyncHandler(async (req, res) => {
    const query = parsePaginationQuery(req);
    const results = await findAllUsers(query);

    sendPaginatedResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Users retrieved successfully!',
        data: results.users,
        meta: results.meta,
    });
});

export const getUser = asyncHandler(async (req, res) => {
    const id = requiredField(req.params.id, 'Id');

    const user = await findUser(id);

    sendResponse<Omit<User, 'password'>>(res, {
        statusCode: status.OK,
        success: true,
        message: 'User retrieved successfully!',
        data: user,
    });
});

export const updateUser = asyncHandler(async (req, res) => {
    const id = requiredField(req.params.id, 'Id');

    const user = await patchUser(id, req.body);

    sendResponse<Omit<User, 'password'>>(res, {
        statusCode: status.OK,
        success: true,
        message: 'User data updated successfully!',
        data: user,
    });
});

export const deleteUser = asyncHandler(async (req, res) => {
    const id = requiredField(req.params.id, 'Id');

    const result = await removeUser(id);

    sendResponse<User>(res, {
        statusCode: status.OK,
        success: true,
        message: 'User deleted successfully!',
        data: result,
    });
});
