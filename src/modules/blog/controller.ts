import { Blog } from 'generated/prisma/client';
import { UserRole } from 'generated/prisma/enums';
import status from 'http-status';
import { asyncHandler } from 'utils/asyncHandler';
import { parsePaginationQuery } from 'utils/pagination';
import { sendPaginatedResponse, sendResponse } from 'utils/response';
import { requiredField } from 'utils/validate';
import { findAllBlogs, findBlog, findMyBlogs, insertBlog, patchBlog, removeBlog } from './service';

export const createBlog = asyncHandler(async (req, res) => {
    const blog = await insertBlog({
        ...req.body,
        userId: req.user.userId as string,
    });

    sendResponse<Blog>(res, {
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

    sendResponse<Blog>(res, {
        statusCode: status.OK,
        success: true,
        message: 'Blog retrieved successfully',
        data: blog,
    });
});

export const getMyBlogs = asyncHandler(async (req, res) => {
    const query = parsePaginationQuery(req);
    const { blogs, meta } = await findMyBlogs(req.user.userId as string, query);

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

    const blog = await patchBlog(id, req.user.userId as string, req.body);

    sendResponse<Blog>(res, {
        statusCode: status.OK,
        success: true,
        message: 'Blog updated successfully',
        data: blog,
    });
});

export const deleteBlog = asyncHandler(async (req, res) => {
    const id = requiredField(req.params.id, 'Id');

    await removeBlog(id, req.user.userId as string, req.user.role as UserRole);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Blog deleted successfully',
        data: null,
    });
});
