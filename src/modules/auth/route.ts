import { Router } from 'express';
import { validateSchema } from 'utils/validate';
import { login, logout, refreshToken, register } from './controller';
import { loginSchema, refreshTokenSchema, registerSchema } from './schema';
import './swagger';

const authRoutes = Router();

authRoutes.post('/register', validateSchema(registerSchema), register);
authRoutes.post('/login', validateSchema(loginSchema), login);
authRoutes.post('/refresh', validateSchema(refreshTokenSchema), refreshToken);
authRoutes.post('/logout', validateSchema(refreshTokenSchema), logout);

export default authRoutes;
