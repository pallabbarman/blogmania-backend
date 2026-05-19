import status from 'http-status';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { parsePaginationQuery } from '../../utils/pagination.js';
import { sendPaginatedResponse, sendResponse } from '../../utils/response.js';
import { requiredField } from '../../utils/validate.js';
import { findAllTopics, findTopic, insertTopic, patchTopic, removeTopic } from './service.js';
export const createTopic = asyncHandler(async (req, res) => {
    const result = await insertTopic(req.body);
    sendResponse(res, {
        statusCode: status.CREATED,
        success: true,
        message: 'Topic added successfully',
        data: result,
    });
});
export const getAllTopics = asyncHandler(async (req, res) => {
    const query = parsePaginationQuery(req);
    const { topics, meta } = await findAllTopics(query);
    sendPaginatedResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Topics retrieved successfully',
        data: topics,
        meta,
    });
});
export const getTopic = asyncHandler(async (req, res) => {
    const id = requiredField(req.params.id, 'Id');
    const result = await findTopic(id);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Topic retrieved successfully',
        data: result,
    });
});
export const updateTopic = asyncHandler(async (req, res) => {
    const id = requiredField(req.params.id, 'Id');
    const result = await patchTopic(id, req.body);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Topic retrieved successfully',
        data: result,
    });
});
export const deleteTopic = asyncHandler(async (req, res) => {
    const id = requiredField(req.params.id, 'Id');
    const result = await removeTopic(id);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Topic deleted successfully!',
        data: result,
    });
});
