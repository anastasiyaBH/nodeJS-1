import { v4 as uuid } from 'uuid';

class GroupService {
    constructor(groupModel) {
        this.groupModel = groupModel;
    }

    async createGroup(user) {
        return await this.groupModel.create({ ...user, id: uuid() });
    }

    async updateGroup(id, payload) {
        return await this.groupModel.update(payload, {
            where: {
                id
            }
        });
    }

    async getAllGroups() {
        return await this.groupModel.findAll();
    }

    async getGroupById(id) {
        return await this.groupModel.findOne({
            where: {
                id
            }
        });
    }

    async removeGroup(id) {
        return await this.groupModel.destroy({
            where: {
                id
            }
        });
    }
}

export default GroupService;
