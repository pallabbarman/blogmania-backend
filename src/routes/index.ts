import { Router } from 'express';
import authRoutes from 'modules/auth/route';
import contactRoutes from 'modules/contact/route';
import userRoutes from 'modules/users/route';

const routes = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: authRoutes,
    },
    {
        path: '/users',
        route: userRoutes,
    },
    {
        path: '/contact',
        route: contactRoutes,
    },
];

moduleRoutes.forEach((route) => routes.use(route.path, route.route));

export default routes;
