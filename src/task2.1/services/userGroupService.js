import { UserGroup } from '../models';
import dataBase from '../data-access/db';

class UserGroupService {
    constructor(db) {
        this.db = db;
    }

    async addUsersToGroup(groupId, userIds) {
        const t = await this.db.transaction();

        const rows = userIds.map(userId => ({
            user_id: userId,
            group_id: groupId
        }));

        await UserGroup.bulkCreate(rows, {
            transaction: t

        })
            .then(() => {
                t.commit();
            });
    }
}

export default new UserGroupService(dataBase);
