import { v4 as uuid } from 'uuid';

import { Group } from '../models';

class GroupService {
    async createGroup(user) {
        return await Group.create({ ...user, id: uuid() });
    }

    async updateGroup(id, payload) {
        return await Group.update(payload, {
            where: {
                id
            }
        });
    }

    async getAllGroups() {
        return await Group.findAll();
    }

    async getGroupById(id) {
        return await Group.findOne({
            where: {
                id
            }
        });
    }

    async removeGroup(id) {
        return await Group.destroy({
            where: {
                id
            }
        });
    }
}

export default new GroupService();
