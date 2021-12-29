import { v4 as uuid } from 'uuid';
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

import { User } from '../models';


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
            limit: limit || process.env.DB_DEFAULT_LIMIT,
            attributes: [
                'id', 'login', 'password', 'age'
            ]
        });
    }

    async login(username, password) {
        const user = await User.findOne({
            where: {
                login: username
            },
            attributes: [
                'id', 'login', 'password', 'age'
            ]
        });

        if (!user) {
            throw { status: StatusCodes.UNAUTHORIZED, message: ReasonPhrases.UNAUTHORIZED };
        }

        if (user.password !== password) {
            throw { status: StatusCodes.FORBIDDEN, message: ReasonPhrases.FORBIDDEN };
        }

        if (!process.env.JWT_SECRET || !process.env.JWT_TOKEN_EXPIRATION) {
            throw new Error('JWT Credentials Error');
        }

        return jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TOKEN_EXPIRATION });
    }
}

export default new UserService();
