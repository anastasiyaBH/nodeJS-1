import { Sequelize } from 'sequelize';

import winstonLogger from '../middlewares/winston-logger';

if (!process.env.DB_NAME || !process.env.DB_USERNAME || !process.env.DB_PASSWORD) {
    throw new Error('Postgres Credentials Error');
}

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    omitNull: true,
    define: {
        timestamps: false
    }
});

db.authenticate().then(
    success => {
        winstonLogger.info('Connection has been established successfully', success);
    },
    error => {
        winstonLogger.error('Unable to connect to the database', error);
    }
);

export default db;
