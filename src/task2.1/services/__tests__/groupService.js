import '../../config';

import groupService  from '../groupService';

describe('UserService', () => {
    const mockDataObj = {
        id: 'f00f7b24-42c1-4824-9931-41ff23a87a92',
        name: 'mockGroup1',
        permissions: ['READ', 'WRITE']
    };

    const mockId = 'f00f7b24-42c1-4824-9931-41ff277777';

    const mockGroup = { name: 'updated-mock-group',  permissions: ['READ', 'WRITE'] };

    const mockGroupModel = {
        create: jest.fn((newEntity) => Promise.resolve({ ...newEntity, id: mockId })),
        findOne: jest.fn(() => Promise.resolve(mockDataObj)),
        findAll: jest.fn(() => Promise.resolve([mockDataObj])),
        destroy: jest.fn(() => Promise.resolve(undefined)),
        update: jest.fn(() => Promise.resolve({ ...mockGroup, id: mockDataObj.id }))
    };

    const mockGroupService = new groupService(mockGroupModel);

    test('should get group by ID', () => {
        return mockGroupService.getGroupById(mockDataObj.id)
            .then((entity) => expect(entity).toEqual(mockDataObj));
    });

    test('should get all groups', () => {
        return expect(mockGroupService.getAllGroups()).resolves.toEqual([mockDataObj]);
    });

    test('should create new group', () => {
        return mockGroupService.createGroup(mockGroup).then((createdEntity) => expect(createdEntity).toEqual({ ...mockGroup, id: mockId }));
    });

    test('should update group', () => {
        const entityId = mockDataObj.id;
        return mockGroupService.updateGroup(mockGroup, entityId).then((updatedObj) => expect(updatedObj).toEqual({ ...mockGroup, id: entityId }));
    });

    test('should remove group', () => {
        return mockGroupService.removeGroup(mockId)
            .then((result) => expect(result).toBe(undefined));
    });
});
