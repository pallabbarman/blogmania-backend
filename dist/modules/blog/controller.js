import status from 'http-status';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { parsePaginationQuery } from '../../utils/pagination.js';
import { sendPaginatedResponse, sendResponse } from '../../utils/response.js';
import { requiredField } from '../../utils/validate.js';
import { findAllBlogs, findBlog, findMyBlogs, insertBlog, patchBlog, removeBlog } from './service.js';
export const createBlog = asyncHandler(async (req, res) => {
    const blog = await insertBlog({
        ...req.body,
        userId: req.user.userId,
    });
    sendResponse(res, {
        statusCode: status.CREATED,
        success: true,
        message: 'Blog created successfully',
        data: blog,
    });
});
export const getAllBlogs = asyncHandler(async (req, res) => {
    const query = parsePaginationQuery(req);
    const { blogs, meta } = await findAllBlogs(query);
    sendPaginatedResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Blogs retrieved successfully',
        data: blogs,
        meta,
    });
});
export const getBlog = asyncHandler(async (req, res) => {
    const id = requiredField(req.params.id, 'Id');
    const blog = await findBlog(id);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Blog retrieved successfully',
        data: blog,
    });
});
export const getMyBlogs = asyncHandler(async (req, res) => {
    const query = parsePaginationQuery(req);
    const { blogs, meta } = await findMyBlogs(req.user.userId, query);
    sendPaginatedResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Your blogs retrieved successfully',
        data: blogs,
        meta,
    });
});
export const updateBlog = asyncHandler(async (req, res) => {
    const id = requiredField(req.params.id, 'Id');
    const blog = await patchBlog(id, req.user.userId, req.body);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Blog updated successfully',
        data: blog,
    });
});
export const deleteBlog = asyncHandler(async (req, res) => {
    const id = requiredField(req.params.id, 'Id');
    await removeBlog(id, req.user.userId, req.user.role);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Blog deleted successfully',
        data: null,
    });
});
