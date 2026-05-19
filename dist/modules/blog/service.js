import HttpError from '../../errors/httpError.js';
import { UserRole } from '../../generated/prisma/client.js';
import status from 'http-status';
import { buildPaginationMetaData, getPaginationSkipData } from '../../utils/pagination.js';
import { prisma } from '../../utils/prisma.js';
import { isAllowedSortField } from '../../utils/sort.js';
import { blogSortFields } from './constant.js';
export const insertBlog = async (data) => {
    const topic = await prisma.topic.findUnique({ where: { id: data.topicId } });
    if (!topic) {
        throw new HttpError(status.NOT_FOUND, 'Topic not found');
    }
    return prisma.blog.create({
        data,
    });
};
export const findAllBlogs = async (query) => {
    const { page, limit, search, sortBy, sortOrder, topicId, tag } = query;
    const skip = getPaginationSkipData(page, limit);
    const where = {
        ...(topicId && { topicId }),
        ...(tag && { tags: { has: tag } }),
        ...(search && {
            OR: [
                { title: { contains: search, mode: 'insensitive' } },
                { tags: { has: search } },
                { topic: { name: { contains: search, mode: 'insensitive' } } },
            ],
        }),
    };
    const orderBy = isAllowedSortField(sortBy, blogSortFields)
        ? { [sortBy]: sortOrder }
        : { createdAt: sortOrder };
    const [blogs, total] = await prisma.$transaction([
        prisma.blog.findMany({ where, orderBy, skip, take: limit }),
        prisma.blog.count({ where }),
    ]);
    return { blogs, meta: buildPaginationMetaData(total, page, limit) };
};
export const findBlog = async (id) => {
    const blog = await prisma.blog.findUnique({
        where: { id },
    });
    if (!blog) {
        throw new HttpError(status.NOT_FOUND, 'Blog not found');
    }
    return blog;
};
export const findMyBlogs = async (userId, query) => {
    const { page, limit, search, sortBy, sortOrder } = query;
    const skip = getPaginationSkipData(page, limit);
    const where = {
        userId,
        ...(search && { title: { contains: search, mode: 'insensitive' } }),
    };
    const orderBy = isAllowedSortField(sortBy, blogSortFields)
        ? { [sortBy]: sortOrder }
        : { createdAt: sortOrder };
    const [blogs, total] = await prisma.$transaction([
        prisma.blog.findMany({ where, orderBy, skip, take: limit }),
        prisma.blog.count({ where }),
    ]);
    return { blogs, meta: buildPaginationMetaData(total, page, limit) };
};
export const patchBlog = async (id, userId, data) => {
    const blog = await prisma.blog.findUnique({ where: { id } });
    if (!blog) {
        throw new HttpError(status.NOT_FOUND, 'Blog not found');
    }
    if (blog.userId !== userId) {
        throw new HttpError(status.FORBIDDEN, 'You can only edit your own blogs');
    }
    if (data.topicId) {
        const topic = await prisma.topic.findUnique({ where: { id: data.topicId } });
        if (!topic) {
            throw new HttpError(status.NOT_FOUND, 'Topic not found');
        }
    }
    return prisma.blog.update({
        where: { id },
        data,
    });
};
export const removeBlog = async (id, userId, userRole) => {
    const blog = await prisma.blog.findUnique({ where: { id } });
    if (!blog) {
        throw new HttpError(status.NOT_FOUND, 'Blog not found');
    }
    const isAdmin = userRole === UserRole.ADMIN || userRole === UserRole.SUPER_ADMIN;
    if (!isAdmin && blog.userId !== userId) {
        throw new HttpError(status.FORBIDDEN, 'You can only delete your own blogs');
    }
    await prisma.blog.delete({ where: { id } });
};
