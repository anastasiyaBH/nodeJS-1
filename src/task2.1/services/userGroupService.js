import { Op } from 'sequelize';

import { Group, User } from '../models';
import dataBase from '../data-access/db';

class UserGroupService {
    constructor(db) {
        this.db = db;
    }

    async addUsersToGroup(groupId, userIds) {
        const t = await this.db.transaction();

        const group = await Group.findOne({
            where: {
                id: groupId
            },
            transaction: t
        });

        const users = await User.findAll({
            where: {
                id: {
                    [Op.in]: userIds
                }
            },
            transaction: t
        });

        await group.addUsers(users, { transaction: t });

        await t.commit();
    }
}

export default new UserGroupService(dataBase);
