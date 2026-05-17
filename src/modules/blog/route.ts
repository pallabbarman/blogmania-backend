import { Router } from 'express';
import { UserRole } from 'generated/prisma/enums';
import authGuard from 'middlewares/authGuard';
import roleGuard from 'middlewares/roleGuard';
import { validateSchema } from 'utils/validate';
import { createBlog, deleteBlog, getAllBlogs, getBlog, getMyBlogs, updateBlog } from './controller';
import { createBlogSchema, updateBlogSchema } from './schema';

const blogRoutes = Router();

blogRoutes.get('/', getAllBlogs);
blogRoutes.get('/:id', getBlog);
blogRoutes.post(
    '/',
    authGuard,
    roleGuard(UserRole.AUTHOR, UserRole.ADMIN, UserRole.SUPER_ADMIN),
    validateSchema(createBlogSchema),
    createBlog
);
blogRoutes.get(
    '/me/blogs',
    authGuard,
    roleGuard(UserRole.AUTHOR, UserRole.ADMIN, UserRole.SUPER_ADMIN),
    getMyBlogs
);
blogRoutes.patch(
    '/:id',
    authGuard,
    roleGuard(UserRole.AUTHOR, UserRole.ADMIN, UserRole.SUPER_ADMIN),
    validateSchema(updateBlogSchema),
    updateBlog
);
blogRoutes.delete(
    '/:id',
    authGuard,
    roleGuard(UserRole.AUTHOR, UserRole.ADMIN, UserRole.SUPER_ADMIN),
    deleteBlog
);

export default blogRoutes;
