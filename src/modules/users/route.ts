import { Router } from 'express';
import { getAllUsers, getUser } from './controller';

const userRoutes = Router();

userRoutes.get('/', getAllUsers);
userRoutes.get('/:id', getUser);

export default userRoutes;
