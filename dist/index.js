import { errorLogger, logger } from './utils/logger.js';
import app from './app.js';
import configs from './configs/env.js';
const startServer = async () => {
    const server = app.listen(configs.port, () => {
        logger.info(`Server running on port ${configs.port}`);
    });
    const exitHandler = () => {
        if (server) {
            server.close(() => {
                logger.info('Server closed');
            });
        }
        process.exit(1);
    };
    const unexpectedErrorHandler = (error) => {
        errorLogger.error(error);
        exitHandler();
    };
    process.on('uncaughtException', unexpectedErrorHandler);
    process.on('unhandledRejection', unexpectedErrorHandler);
};
startServer();
