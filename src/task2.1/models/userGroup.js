import { DataTypes, Model } from 'sequelize';

import { User, Group } from '../models';

class UserGroup  extends Model {
    static initModel(sequelize) {
        UserGroup.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: DataTypes.UUIDV4,
                references: {
                    model: User,
                    key: 'id'
                }
            },
            group_id: {
                type: DataTypes.UUIDV4,
                references: {
                    model: Group,
                    key: 'id'
                }
            }
        }, { sequelize, tableName: 'userGroup' });
    }
}

export default UserGroup;
