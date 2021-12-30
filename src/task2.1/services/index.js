import UserService from './userService';
import GroupService from './groupService';
import UserGroupService from './userGroupService';

import { User, Group } from '../models';

export const userService = new UserService(User);
export const groupService = new GroupService(Group);
export const userGroupService = UserGroupService;

