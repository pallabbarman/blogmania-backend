import { Router } from 'express';
import { UserRole } from 'generated/prisma/enums';
import authGuard from 'middlewares/authGuard';
import roleGuard from 'middlewares/roleGuard';
import { validateSchema } from 'utils/validate';
import { createTopic, deleteTopic, getAllTopics, getTopic, updateTopic } from './controller';
import { topicSchema } from './schema';

const topicRoutes = Router();

topicRoutes.get('/', getAllTopics);
topicRoutes.get('/:id', getTopic);
topicRoutes.post(
    '/',
    validateSchema(topicSchema),
    authGuard,
    roleGuard(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    createTopic
);
topicRoutes.patch(
    '/:id',
    validateSchema(topicSchema),
    authGuard,
    roleGuard(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    updateTopic
);
topicRoutes.delete('/:id', authGuard, roleGuard(UserRole.ADMIN, UserRole.SUPER_ADMIN), deleteTopic);

export default topicRoutes;
