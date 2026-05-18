import { Router } from 'express';
import { UserRole } from 'generated/prisma/enums';
import authGuard from 'middlewares/authGuard';
import roleGuard from 'middlewares/roleGuard';
import { validateSchema } from 'utils/validate';
import {
    createComment,
    deleteComment,
    getAllComments,
    getComment,
    updateComment,
} from './controller';
import { commentSchema } from './schema';

const commentRoutes = Router();

commentRoutes.get('/', getAllComments);
commentRoutes.get('/:id', getComment);
commentRoutes.post(
    '/',
    validateSchema(commentSchema),
    authGuard,
    roleGuard(UserRole.USER, UserRole.AUTHOR, UserRole.ADMIN, UserRole.SUPER_ADMIN),
    createComment
);
commentRoutes.patch(
    '/:id',
    validateSchema(commentSchema),
    authGuard,
    roleGuard(UserRole.USER, UserRole.AUTHOR, UserRole.ADMIN, UserRole.SUPER_ADMIN),
    updateComment
);
commentRoutes.delete(
    '/:id',
    authGuard,
    roleGuard(UserRole.USER, UserRole.AUTHOR, UserRole.ADMIN, UserRole.SUPER_ADMIN),
    deleteComment
);

export default commentRoutes;
