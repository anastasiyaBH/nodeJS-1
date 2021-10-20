import { v4 as uuid } from 'uuid';

export const users = [];

export const createUser = (user) => {
    users.push({
        ...user,
        id: uuid(),
        isDeleted: false,
    });
}

export const getUserById = (id) => users.find(user => user.id === id);

export const removeUser = (id) => {
    const removedUserIndex = users.findIndex((user) =>
    {
        console.log(user.id, id);
        return user.id === id
    });
    const userInfo = {...users[removedUserIndex], isDeleted: true};
    users.splice(removedUserIndex, 1, userInfo)
}

export const updateUser = (id, user) => {
    const updatedUserIndex = users.findIndex((user) => user.id === id);
    users.splice(updatedUserIndex, 1, {...users[updatedUserIndex], ...user})
}

export const getAutoSuggestUsers = (loginSubstr, limit) => {
    if(!loginSubstr) return users.filter(user => !user.isDeleted).slice(0, limit);

    return users
        .filter(user => !user.isDeleted && (user.login.indexOf(loginSubstr) !== -1))
        .slice(0,limit);
}
