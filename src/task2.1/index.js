import express from 'express';

import routes from './routes';
import errorMiddleware from './middlewares/error-middleware';
import loggerMiddleware from './middlewares/logger-middleware';
import winstonLogger from './middlewares/winston-logger';

const app = express();

app.listen(process.env.PORT || 8080);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(loggerMiddleware);
app.use(errorMiddleware);

app.use(routes);

process.on('uncaughtException', (error, origin) => {
    winstonLogger.error('Uncaught Exception:', error, origin);
});

process.on('unhandledRejection', (error, origin) => {
    winstonLogger.error('Unhandled Rejection:', error, origin);
});

