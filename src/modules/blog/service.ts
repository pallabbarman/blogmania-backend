import HttpError from 'errors/httpError';
import { Blog, Prisma, UserRole } from 'generated/prisma/client';
import status from 'http-status';
import { BlogQueryType } from 'types/blog';
import { buildPaginationMetaData, getPaginationSkipData } from 'utils/pagination';
import { prisma } from 'utils/prisma';
import { isAllowedSortField } from 'utils/sort';
import { blogSortFields } from './constant';

export const insertBlog = async (data: Blog) => {
    const topic = await prisma.topic.findUnique({ where: { id: data.topicId } });

    if (!topic) {
        throw new HttpError(status.NOT_FOUND, 'Topic not found');
    }

    return prisma.blog.create({
        data,
    });
};

export const findAllBlogs = async (query: BlogQueryType) => {
    const { page, limit, search, sortBy, sortOrder, topicId, tag } = query;
    const skip = getPaginationSkipData(page, limit);

    const where: Prisma.BlogWhereInput = {
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

    const orderBy: Prisma.BlogOrderByWithRelationInput = isAllowedSortField(sortBy, blogSortFields)
        ? { [sortBy]: sortOrder }
        : { createdAt: sortOrder };

    const [blogs, total] = await prisma.$transaction([
        prisma.blog.findMany({ where, orderBy, skip, take: limit }),
        prisma.blog.count({ where }),
    ]);

    return { blogs, meta: buildPaginationMetaData(total, page, limit) };
};

export const findBlog = async (id: string) => {
    const blog = await prisma.blog.findUnique({
        where: { id },
    });

    if (!blog) {
        throw new HttpError(status.NOT_FOUND, 'Blog not found');
    }

    return blog;
};

export const findMyBlogs = async (userId: string, query: BlogQueryType) => {
    const { page, limit, search, sortBy, sortOrder } = query;
    const skip = getPaginationSkipData(page, limit);

    const where: Prisma.BlogWhereInput = {
        userId,
        ...(search && { title: { contains: search, mode: 'insensitive' } }),
    };

    const orderBy: Prisma.BlogOrderByWithRelationInput = isAllowedSortField(sortBy, blogSortFields)
        ? { [sortBy]: sortOrder }
        : { createdAt: sortOrder };

    const [blogs, total] = await prisma.$transaction([
        prisma.blog.findMany({ where, orderBy, skip, take: limit }),
        prisma.blog.count({ where }),
    ]);

    return { blogs, meta: buildPaginationMetaData(total, page, limit) };
};

export const patchBlog = async (id: string, userId: string, data: Partial<Blog>) => {
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

export const removeBlog = async (id: string, userId: string, userRole: UserRole) => {
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
