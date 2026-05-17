import HttpError from 'errors/httpError';
import { Blog, UserRole } from 'generated/prisma/client';
import status from 'http-status';
import { prisma } from 'utils/prisma';

export const insertBlog = async (data: Blog) => {
    const topic = await prisma.topic.findUnique({ where: { id: data.topicId } });

    if (!topic) {
        throw new HttpError(status.NOT_FOUND, 'Topic not found');
    }

    return prisma.blog.create({
        data,
    });
};

export const findAllBlogs = async () => {
    const result = await prisma.contact.findMany();

    return result;
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

export const findMyBlogs = async (userId: string) => {
    return prisma.blog.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
    });
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
