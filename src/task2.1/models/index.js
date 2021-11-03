import db from '../data-access/db';
import User from './user';

User.initModel(db);

export {
    User
};
