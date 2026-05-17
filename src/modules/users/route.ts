import { Router } from 'express';
import { UserRole } from 'generated/prisma/enums';
import authGuard from 'middlewares/authGuard';
import roleGuard from 'middlewares/roleGuard';
import { validateSchema } from 'utils/validate';
import { deleteUser, getAllUsers, getUser, updateUser } from './controller';
import { userUpdateSchema } from './schema';

const userRoutes = Router();

userRoutes.get(
    '/',
    // authGuard, roleGuard(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    getAllUsers
);
userRoutes.get('/:id', authGuard, roleGuard(UserRole.ADMIN, UserRole.SUPER_ADMIN), getUser);
userRoutes.patch(
    '/:id',
    validateSchema(userUpdateSchema),
    authGuard,
    roleGuard(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    updateUser
);
userRoutes.delete('/:id', authGuard, roleGuard(UserRole.ADMIN, UserRole.SUPER_ADMIN), deleteUser);

export default userRoutes;
