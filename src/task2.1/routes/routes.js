import express from 'express';
import { StatusCodes } from 'http-status-codes';
import joiValidator from 'express-joi-validation';

import status from './status';
import { userService, groupService, userGroupService } from '../services';

import { userSchema, groupSchema } from '../validation/schema';
import winstonLogger from '../middlewares/winston-logger';

const router = express.Router();

const validator = joiValidator.createValidator({});

router.get('/', (req, res) => {
    res.status(StatusCodes.OK).send(status.REST_AVAILABLE);
});

router.post('/user', validator.body(userSchema), async (req, res) => {
    await userService.createUser(req.body)
        .then(() => {
            res.status(StatusCodes.CREATED).send(status.USER_CREATED);
        })
        .catch((e) => {
            winstonLogger.error(e.message, { methodName: 'userService.createUser', args: req.body });
        });
});

router.get('/users/:id', async (req, res) => {
    await userService.getUserById(req.params?.id)
        .then((user) => {
            if (!user) {
                res.status(StatusCodes.NOT_FOUND).send(status.USER_NOT_FOUND);
            } else {
                res.json(user);
            }
        })
        .catch((e) => {
            winstonLogger.error(e.message, { methodName: 'userService.getUserById', args:{
                id: req.params?.id
            } });
        });
});

router.delete('/users/:id', async (req, res) => {
    await userService.removeUser(req.params?.id)
        .then(() => {
            res.status(StatusCodes.OK).send(status.USER_REMOVED);
        })
        .catch((e) => {
            winstonLogger.error(e.message, { methodName: 'userService.removeUser', args:{
                id: req.params?.id
            } });
        });
});

router.post('/users/:id', validator.body(userSchema), async (req, res) => {
    await userService.updateUser(req.params.id, req.body)
        .then(() => {
            res.status(StatusCodes.OK).send(status.USER_UPDATED);
        })
        .catch((e) => {
            winstonLogger.error(e.message, { methodName: 'userService.updateUser', args:{
                id: req.params?.id,
                body: req.body
            } });
        });
});

router.get('/users', async (req, res) => {
    const searchQuery = req.query.query;
    const limit = req.query.limit;
    await userService.getAutoSuggestUsers(searchQuery, limit)
        .then((result) => {
            res.json(result);
        })
        .catch((e) => {
            winstonLogger.error(e.message, { methodName: 'userService.getAutoSuggestUsers', args:{
                searchQuery,
                limit
            } });
        });
});


router.post('/group', validator.body(groupSchema), async (req, res) => {
    await groupService.createGroup(req.body)
        .then(() => {
            res.status(StatusCodes.CREATED).send(status.GROUP_CREATED);
        })
        .catch((e) => {
            winstonLogger.error(e.message, { methodName: 'groupService.createGroup', args: req.body });
        });
});

router.get('/groups/:id', async (req, res) => {
    await groupService.getGroupById(req.params?.id)
        .then((user) => {
            if (!user) {
                res.status(StatusCodes.NOT_FOUND).send(status.GROUP_NOT_FOUND);
            } else {
                res.json(user);
            }
        })
        .catch((e) => {
            winstonLogger.error(e.message, { methodName: 'groupService.getGroupById', args:{
                id: req.params?.id
            } });
        });
});

router.delete('/groups/:id', async (req, res) => {
    await groupService.removeGroup(req.params?.id)
        .then(() => {
            res.status(StatusCodes.OK).send(status.GROUP_REMOVED);
        })
        .catch((e) => {
            winstonLogger.error(e.message, { methodName: 'groupService.removeGroup', args:{
                id: req.params?.id
            } });
        });
});

router.post('/gruops/:id', validator.body(groupSchema), async (req, res) => {
    await groupService.updateGroup(req.params.id, req.body)
        .then(() => {
            res.status(StatusCodes.OK).send(status.GROUP_UPDATED);
        })
        .catch((e) => {
            winstonLogger.error(e.message, { methodName: 'groupService.updateGroup', args:{
                id: req.params?.id,
                body: req.body
            } });
        });
});

router.get('/groups', async (req, res) => {
    await groupService.getAllGroups()
        .then((result) => {
            res.json(result);
        })
        .catch((e) => {
            winstonLogger.error(e.message, { methodName: 'groupService.getAllGroups' });
        });
});

router.get('/user-groups', async (req, res) => {
    const { groupId, userIds } = req.query;

    await userGroupService.addUsersToGroup(groupId, userIds)
        .then((result) => {
            res.json(result);
        })
        .catch((e) => {
            winstonLogger.error(e.message, { methodName: 'userGroupService.addUsersToGroup', args: {
                groupId,
                userIds
            } });
        });
});

export default router;
