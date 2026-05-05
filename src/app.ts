import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/', routes);

app.get('/', (_req, res) => {
    res.send('Successfully Running App!');
});

export default app;
