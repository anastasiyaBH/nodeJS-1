import { Sequelize } from 'sequelize';
import APP_CONFIG from '../config';

const db = new Sequelize(APP_CONFIG.DB_NAME, APP_CONFIG.DB_USERNAME, APP_CONFIG.DB_PASSWORD, {
    host: APP_CONFIG.DB_HOST,
    port: APP_CONFIG.DB_PORT,
    dialect: 'postgres',
    define: {
        timestamps: false
    }
});

export default db;
