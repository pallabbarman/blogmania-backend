import { User } from 'generated/prisma/client';
import status from 'http-status';
import { asyncHandler } from 'utils/asyncHandler';
import { sendResponse } from 'utils/response';
import { findAllUsers } from './service';

export const getAllUsers = asyncHandler(async (_req, res) => {
    const users = await findAllUsers();

    sendResponse<User[]>(res, {
        statusCode: status.OK,
        success: true,
        message: 'Users retrieved successfully!',
        data: users,
    });
});
