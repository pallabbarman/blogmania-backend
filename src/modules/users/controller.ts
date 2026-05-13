import { User } from 'generated/prisma/client';
import status from 'http-status';
import { asyncHandler } from 'utils/asyncHandler';
import { sendResponse } from 'utils/response';
import { requiredField } from 'utils/validate';
import { findAllUsers, findUser } from './service';

export const getAllUsers = asyncHandler(async (_req, res) => {
    const users = await findAllUsers();

    sendResponse<Omit<User, 'password'>[]>(res, {
        statusCode: status.OK,
        success: true,
        message: 'Users retrieved successfully!',
        data: users,
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
