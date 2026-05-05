import express from 'express';
import errorHandler from 'middlewares/errorHandler';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/', routes);

app.get('/', (_req, res) => {
    res.send('Successfully Running App!');
});

app.use(errorHandler);

export default app;
