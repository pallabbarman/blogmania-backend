import { Router } from 'express';
import authRoutes from '../modules/auth/route.js';
import blogRoutes from '../modules/blog/route.js';
import commentRoutes from '../modules/comment/route.js';
import contactRoutes from '../modules/contact/route.js';
import topicRoutes from '../modules/topic/route.js';
import userRoutes from '../modules/users/route.js';
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
        path: '/contacts',
        route: contactRoutes,
    },
    {
        path: '/topics',
        route: topicRoutes,
    },
    {
        path: '/comments',
        route: commentRoutes,
    },
    {
        path: '/blogs',
        route: blogRoutes,
    },
];
moduleRoutes.forEach((route) => routes.use(route.path, route.route));
export default routes;
