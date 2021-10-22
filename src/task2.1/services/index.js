import { v4 as uuid } from 'uuid';

export const users = [];

export const createUser = (user) => {
    users.push({
        ...user,
        id: uuid(),
        isDeleted: false
    });
};

export const getUserById = (id) => users.find(user => user.id === id && !user.isDeleted);

export const removeUser = (id) => {
    const removedUserIndex = users.findIndex((user) => {
        return user.id === id;
    });
    const userInfo = { ...users[removedUserIndex], isDeleted: true };
    users.splice(removedUserIndex, 1, userInfo);
};

export const updateUser = (id, user) => {
    const updatedUserIndex = users.findIndex((entity) => entity.id === id);
    users.splice(updatedUserIndex, 1, { ...users[updatedUserIndex], ...user });
};

const usersComparatorByLogin = (a, b) => {
    if (a.login < b.login) {
        return -1;
    }
    if (a.login > b.login) {
        return 1;
    }
    return 0;
};

export const getAutoSuggestUsers = (loginSubstr, limit) => {
    if (!loginSubstr) {
        return users
            .filter(user => !user.isDeleted)
            .sort(usersComparatorByLogin)
            .slice(0, limit);
    }

    return users
        .filter(user => !user.isDeleted && (user.login.indexOf(loginSubstr) !== -1))
        .sort(usersComparatorByLogin)
        .slice(0, limit);
};
