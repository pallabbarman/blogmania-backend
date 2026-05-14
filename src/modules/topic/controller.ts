import { Topic } from 'generated/prisma/client';
import status from 'http-status';
import { asyncHandler } from 'utils/asyncHandler';
import { sendResponse } from 'utils/response';
import { requiredField } from 'utils/validate';
import { findAllTopics, findTopic, insertTopic, patchTopic, removeTopic } from './service';

export const createTopic = asyncHandler(async (req, res) => {
    const result = await insertTopic(req.body);

    sendResponse<Topic>(res, {
        statusCode: status.OK,
        success: true,
        message: 'Topic added successfully',
        data: result,
    });
});

export const getAllTopics = asyncHandler(async (_req, res) => {
    const result = await findAllTopics();

    sendResponse<Topic[]>(res, {
        statusCode: status.OK,
        success: true,
        message: 'Topics retrieved successfully',
        data: result,
    });
});

export const getTopic = asyncHandler(async (req, res) => {
    const id = requiredField(req.params.id, 'Id');

    const result = await findTopic(id);

    sendResponse<Topic>(res, {
        statusCode: status.OK,
        success: true,
        message: 'Topic retrieved successfully',
        data: result,
    });
});

export const updateTopic = asyncHandler(async (req, res) => {
    const id = requiredField(req.params.id, 'Id');

    const result = await patchTopic(id, req.body);

    sendResponse<Topic>(res, {
        statusCode: status.OK,
        success: true,
        message: 'Topic retrieved successfully',
        data: result,
    });
});

export const deleteTopic = asyncHandler(async (req, res) => {
    const id = requiredField(req.params.id, 'Id');

    const result = await removeTopic(id);

    sendResponse<Topic>(res, {
        statusCode: status.OK,
        success: true,
        message: 'Topic deleted successfully!',
        data: result,
    });
});
