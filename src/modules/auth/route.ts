import { Router } from 'express';
import { validateSchema } from 'utils/validate';
import { login, refreshToken, register } from './controller';
import { loginSchema, refreshTokenSchema, registerSchema } from './schema';

const authRoutes = Router();

authRoutes.post('/register', validateSchema(registerSchema), register);
authRoutes.post('/login', validateSchema(loginSchema), login);
authRoutes.post('/refresh', validateSchema(refreshTokenSchema), refreshToken);

export default authRoutes;
