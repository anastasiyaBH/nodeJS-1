import { v4 as uuid } from 'uuid';

import EntityRepository from '../data-access/EntityRepository';
import { User } from '../models';

const UserRepository = new EntityRepository(User);

class UserService {
    async createUser(user) {
        return await UserRepository.createEntity({ ...user, id: uuid(), is_deleted: false });
    }

    async getUserById(id) {
        return await UserRepository.getById(id);
    }

    async removeUser(id) {
        return await UserRepository.removeEntity(id);
    }

    async updateUser(id, user) {
        return await UserRepository.updateEntity(id, user);
    }

    async getAutoSuggestUsers(loginSubstr, limit) {
        return await UserRepository.getEntities(loginSubstr, limit);
    }
}

export default new UserService();
