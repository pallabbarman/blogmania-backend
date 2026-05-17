import { Comment } from 'generated/prisma/client';
import status from 'http-status';
import { asyncHandler } from 'utils/asyncHandler';
import { sendResponse } from 'utils/response';
import { requiredField } from 'utils/validate';
import {
    findAllComments,
    findComment,
    insertComment,
    patchComment,
    removeComment,
} from './service';

export const createComment = asyncHandler(async (req, res) => {
    const result = await insertComment(req.body);

    sendResponse<Comment>(res, {
        statusCode: status.OK,
        success: true,
        message: 'Comment added successfully',
        data: result,
    });
});

export const getAllComments = asyncHandler(async (_req, res) => {
    const result = await findAllComments();

    sendResponse<Comment[]>(res, {
        statusCode: status.OK,
        success: true,
        message: 'Comments are retrieved successfully',
        data: result,
    });
});

export const getComment = asyncHandler(async (req, res) => {
    const id = requiredField(req.params.id, 'Id');

    const result = await findComment(id);

    sendResponse<Comment>(res, {
        statusCode: status.OK,
        success: true,
        message: 'Comment is retrieved successfully',
        data: result,
    });
});

export const updateComment = asyncHandler(async (req, res) => {
    const id = requiredField(req.params.id, 'Id');

    const result = await patchComment(id, req.body);

    sendResponse<Comment>(res, {
        statusCode: status.OK,
        success: true,
        message: 'Comment updated successfully',
        data: result,
    });
});

export const deleteComment = asyncHandler(async (req, res) => {
    const id = requiredField(req.params.id, 'Id');

    const result = await removeComment(id);

    sendResponse<Comment>(res, {
        statusCode: status.OK,
        success: true,
        message: 'Comment deleted successfully',
        data: result,
    });
});
