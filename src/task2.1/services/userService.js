import { v4 as uuid } from 'uuid';
import { Op } from 'sequelize';

import { User } from '../models';
import APP_CONFIG from '../config';

class UserService {
    async createUser(user) {
        return await User.create({ ...user, id: uuid() });
    }

    async getUserById(id) {
        return await User.findOne({
            where: {
                id
            },
            attributes: [
                'id', 'login', 'password', 'age'
            ]
        });
    }

    async removeUser(id) {
        return await User.destroy({
            where: {
                id
            }
        });
    }

    async updateUser(id, payload) {
        return await User.update(payload, {
            where: {
                id
            }
        });
    }

    async getAutoSuggestUsers(loginSubstr, limit) {
        return await User.findAll({
            where: {
                login: {
                    [Op.substring]: loginSubstr || ''
                }
            },
            limit: limit || APP_CONFIG.DEFAULT_LIMIT,
            attributes: [
                'id', 'login', 'password', 'age'
            ]
        });
    }
}

export default new UserService();
