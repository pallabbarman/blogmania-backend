import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import status from 'http-status';
import errorHandler from 'middlewares/errorHandler';
import routes from './routes';

const app = express();

app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/', routes);

app.get('/', (_req, res) => {
    res.send('Successfully Running App!');
});

// handler for unknown routes
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((_req: Request, res: Response, _next: NextFunction) => {
    res.status(status.NOT_FOUND).json({
        statusCode: status.NOT_FOUND,
        success: false,
        message: 'Route not found',
    });
});

app.use(errorHandler);

export default app;
