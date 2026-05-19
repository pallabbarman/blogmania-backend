import status from 'http-status';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { parsePaginationQuery } from '../../utils/pagination.js';
import { sendPaginatedResponse, sendResponse } from '../../utils/response.js';
import { requiredField } from '../../utils/validate.js';
import { findAllComments, findComment, insertComment, patchComment, removeComment, } from './service.js';
export const createComment = asyncHandler(async (req, res) => {
    const result = await insertComment(req.body);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Comment added successfully',
        data: result,
    });
});
export const getAllComments = asyncHandler(async (req, res) => {
    const query = parsePaginationQuery(req);
    const { comments, meta } = await findAllComments(query);
    sendPaginatedResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Comments are retrieved successfully',
        data: comments,
        meta,
    });
});
export const getComment = asyncHandler(async (req, res) => {
    const id = requiredField(req.params.id, 'Id');
    const result = await findComment(id);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Comment is retrieved successfully',
        data: result,
    });
});
export const updateComment = asyncHandler(async (req, res) => {
    const id = requiredField(req.params.id, 'Id');
    const result = await patchComment(id, req.body);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Comment updated successfully',
        data: result,
    });
});
export const deleteComment = asyncHandler(async (req, res) => {
    const id = requiredField(req.params.id, 'Id');
    const result = await removeComment(id);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Comment deleted successfully',
        data: result,
    });
});
