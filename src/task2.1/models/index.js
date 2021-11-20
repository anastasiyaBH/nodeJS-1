import db from '../data-access/db';
import User from './user';
import Group from './group';
import UserGroup from './userGroup';

User.initModel(db);
Group.initModel(db);
UserGroup.initModel(db);

User.belongsToMany(Group, {
    through: UserGroup
});

Group.belongsToMany(User, {
    through: UserGroup
});

export {
    User,
    Group,
    UserGroup
};
