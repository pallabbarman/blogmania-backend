import { Router } from 'express';
import userRoutes from 'modules/users/route';

const routes = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: userRoutes,
    },
];

moduleRoutes.forEach((route) => routes.use(route.path, route.route));

export default routes;
