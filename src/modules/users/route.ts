import { Router } from 'express';
import { UserRole } from 'generated/prisma/enums';
import authGuard from 'middlewares/authGuard';
import roleGuard from 'middlewares/roleGuard';
import { getAllUsers, getUser } from './controller';

const userRoutes = Router();

userRoutes.get('/', authGuard, roleGuard(UserRole.ADMIN, UserRole.SUPER_ADMIN), getAllUsers);
userRoutes.get('/:id', authGuard, roleGuard(UserRole.ADMIN, UserRole.SUPER_ADMIN), getUser);

export default userRoutes;
