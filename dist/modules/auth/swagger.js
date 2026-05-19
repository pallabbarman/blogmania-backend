import { registry, SwaggerErrorResponseSchema, SwaggerSuccessResponseSchema, } from '../../configs/swagger.js';
import z from 'zod';
import { loginSchema, refreshTokenSchema, registerSchema } from './schema.js';
const TokenResponseSchema = SwaggerSuccessResponseSchema(z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
}));
// POST /auth/register
registry.registerPath({
    method: 'post',
    path: '/auth/register',
    tags: ['Auth'],
    summary: 'Register a new user',
    request: {
        body: {
            content: {
                'application/json': {
                    schema: registerSchema,
                },
            },
        },
    },
    responses: {
        201: {
            description: 'User registered successfully',
            content: { 'application/json': { schema: TokenResponseSchema } },
        },
        409: {
            description: 'Email already in use',
            content: { 'application/json': { schema: SwaggerErrorResponseSchema } },
        },
    },
});
// POST /auth/login
registry.registerPath({
    method: 'post',
    path: '/auth/login',
    tags: ['Auth'],
    summary: 'Login with email and password',
    request: {
        body: {
            content: {
                'application/json': {
                    schema: loginSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: 'Login successful',
            content: { 'application/json': { schema: TokenResponseSchema } },
        },
        401: {
            description: 'Invalid credentials',
            content: { 'application/json': { schema: SwaggerErrorResponseSchema } },
        },
    },
});
// POST /auth/refresh
registry.registerPath({
    method: 'post',
    path: '/auth/refresh',
    tags: ['Auth'],
    summary: 'Rotate refresh token and get new access token',
    request: {
        body: {
            content: {
                'application/json': {
                    schema: refreshTokenSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: 'Tokens refreshed',
            content: { 'application/json': { schema: TokenResponseSchema } },
        },
        401: {
            description: 'Invalid or expired refresh token',
            content: { 'application/json': { schema: SwaggerErrorResponseSchema } },
        },
    },
});
// POST /auth/logout
registry.registerPath({
    method: 'post',
    path: '/auth/logout',
    tags: ['Auth'],
    summary: 'Logout and invalidate refresh token',
    security: [{ bearerAuth: [] }],
    responses: {
        200: {
            description: 'Logged out successfully',
            content: {
                'application/json': {
                    schema: SwaggerSuccessResponseSchema(z.null()),
                },
            },
        },
    },
});
