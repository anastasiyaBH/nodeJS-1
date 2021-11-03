import { Op } from 'sequelize';

import APP_CONFIG from '../config';

class EntityRepository {
    constructor(model) {
        this.model = model;
    }

    async createEntity(payload) {
        try {
            return await this.model.create(payload);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async getById(id) {
        try {
            return  await this.model.findOne({
                where: {
                    id
                },
                attributes: [
                    'id', 'login', 'password', 'age'
                ]
            });
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async updateEntity(id, payload) {
        try {
            return await this.model.update(payload, {
                where: {
                    id
                }
            });
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async removeEntity(id) {
        try {
            return await this.model.update({ is_deleted: true }, {
                where: {
                    id
                }
            });
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async getEntities(query, limit) {
        try {
            return await this.model.findAll({
                where: {
                    login: {
                        [Op.substring]: query || ''
                    },
                    is_deleted: {
                        [Op.is]: false
                    }
                },
                limit: limit || APP_CONFIG.DEFAULT_LIMIT,
                attributes: [
                    'id', 'login', 'password', 'age'
                ]
            });
        } catch (e) {
            return Promise.reject(e);
        }
    }
}

export default EntityRepository;
