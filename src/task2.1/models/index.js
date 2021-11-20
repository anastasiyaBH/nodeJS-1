import db from '../data-access/db';
import User from './user';
import Group from './group';
import UserGroup from './userGroup';

User.initModel(db);
Group.initModel(db);
UserGroup.initModel(db);

User.belongsToMany(Group, {
    through: UserGroup,
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

Group.belongsToMany(User, {
    through: UserGroup,
    foreignKey: 'group_id',
    onDelete: 'cascade'
});

export {
    User,
    Group,
    UserGroup
};
