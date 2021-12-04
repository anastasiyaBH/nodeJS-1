import { Sequelize } from 'sequelize';
import APP_CONFIG from '../config';
import winstonLogger from '../middlewares/winston-logger';

const db = new Sequelize(APP_CONFIG.DB_NAME, APP_CONFIG.DB_USERNAME, APP_CONFIG.DB_PASSWORD, {
    host: APP_CONFIG.DB_HOST,
    port: APP_CONFIG.DB_PORT,
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
