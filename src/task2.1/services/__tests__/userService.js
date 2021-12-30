import '../../config';

import userService from '../userService';

describe('UserService', () => {
    const mockDataObj = {
        id: 'f00f7b24-42c1-4824-9931-41ff23a87a92',
        login: 'mockUser1',
        password: 'qweRTY123!',
        age: 23
    };

    const mockId = 'f00f7b24-42c1-4824-9931-41ff277777';

    const mockUser = { login: 'updated-mock-user', password: '123qweRTY', age: 30 };

    const mockUserModel = {
        create: jest.fn((newEntity) => Promise.resolve({ ...newEntity, id: mockId })),
        findOne: jest.fn(() => Promise.resolve(mockDataObj)),
        findAll: jest.fn(() => Promise.resolve([mockDataObj])),
        destroy: jest.fn(() => Promise.resolve(undefined)),
        update: jest.fn(() => Promise.resolve({ ...mockUser, id: mockDataObj.id }))
    };

    const mockUserService = new userService(mockUserModel);

    test('should get user by ID', () => {
        return mockUserService.getUserById(mockDataObj.id)
            .then((entity) => expect(entity).toEqual(mockDataObj));
    });

    test('should get auto suggest users', () => {
        return expect(mockUserService.getAutoSuggestUsers()).resolves.toEqual([mockDataObj]);
    });

    test('should create new user', () => {
        return mockUserService.createUser(mockUser).then((createdEntity) => expect(createdEntity).toEqual({ ...mockUser, id: mockId }));
    });

    test('should update user', () => {
        const entityId = mockDataObj.id;
        return mockUserService.updateUser(mockUser, entityId).then((updatedObj) => expect(updatedObj).toEqual({ ...mockUser, id: entityId }));
    });

    test('should remove user', () => {
        return mockUserService.removeUser(mockId)
            .then((result) => expect(result).toBe(undefined));
    });
});
