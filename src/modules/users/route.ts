import { Router } from 'express';
import { getAllUsers } from './controller';

const userRoutes = Router();

userRoutes.get('/', getAllUsers);

export default userRoutes;
