import express from 'express';
import { StatusCodes } from 'http-status-codes';
import joiValidator from 'express-joi-validation';

import status from './status';
import { userService, groupService, userGroupService } from '../services';

import { userSchema, groupSchema } from '../validation/schema';

import authorizationMiddleware from '../middlewares/authorization-middleware';

const router = express.Router();

const validator = joiValidator.createValidator({});

router.get('/', (req, res) => {
    res.status(StatusCodes.OK).send(status.REST_AVAILABLE);
});

router.post('/', async (req, res, next) => {
    const { body } = req;
    const { username, password } = body;

    await userService.login(username, password)
        .then((jwtToken) => {
            res.json(jwtToken);
        })
        .catch(e => next(e));
});

router.post('/user', authorizationMiddleware, validator.body(userSchema), async (req, res, next) => {
    await userService.createUser(req.body)
        .then(() => {
            res.status(StatusCodes.CREATED).send(status.USER_CREATED);
        })
        .catch((e) => {
            next({ ...e, methodName: 'userService.createUser', args: req.body });
        });
});

router.get('/users/:id', authorizationMiddleware, async (req, res, next) => {
    await userService.getUserById(req.params?.id)
        .then((user) => {
            if (!user) {
                res.status(StatusCodes.NOT_FOUND).send(status.USER_NOT_FOUND);
            } else {
                res.json(user);
            }
        })
        .catch((e) => {
            next({ ...e,
                methodName: 'userService.getUserById', args:{
                    id: req.params?.id
                } });
        });
});

router.delete('/users/:id', authorizationMiddleware, async (req, res, next) => {
    await userService.removeUser(req.params?.id)
        .then(() => {
            res.status(StatusCodes.OK).send(status.USER_REMOVED);
        })
        .catch((e) => {
            next({
                ...e,
                methodName: 'userService.removeUser',
                args: {
                    id: req.params?.id
                }
            });
        });
});

router.post('/users/:id', authorizationMiddleware, validator.body(userSchema), async (req, res, next) => {
    await userService.updateUser(req.params.id, req.body)
        .then(() => {
            res.status(StatusCodes.OK).send(status.USER_UPDATED);
        })
        .catch((e) => {
            next({
                ...e,
                methodName: 'userService.updateUser',
                args: {
                    id: req.params?.id,
                    body: req.body
                }
            });
        });
});

router.get('/users', authorizationMiddleware, async (req, res, next) => {
    const searchQuery = req.query.query;
    const limit = req.query.limit;
    await userService.getAutoSuggestUsers(searchQuery, limit)
        .then((result) => {
            res.json(result);
        })
        .catch((e) => {
            next({
                ...e,
                methodName: 'userService.getAutoSuggestUsers',
                args:{
                    searchQuery,
                    limit
                }
            });
        });
});


router.post('/group', authorizationMiddleware, validator.body(groupSchema), async (req, res, next) => {
    await groupService.createGroup(req.body)
        .then(() => {
            res.status(StatusCodes.CREATED).send(status.GROUP_CREATED);
        })
        .catch((e) => {
            next({
                ...e,
                methodName: 'groupService.createGroup',
                args: req.body
            });
        });
});

router.get('/groups/:id', authorizationMiddleware, async (req, res, next) => {
    await groupService.getGroupById(req.params?.id)
        .then((user) => {
            if (!user) {
                res.status(StatusCodes.NOT_FOUND).send(status.GROUP_NOT_FOUND);
            } else {
                res.json(user);
            }
        })
        .catch((e) => {
            next({
                ...e,
                methodName: 'groupService.getGroupById',
                args:{
                    id: req.params?.id
                }
            });
        });
});

router.delete('/groups/:id', authorizationMiddleware, async (req, res, next) => {
    await groupService.removeGroup(req.params?.id)
        .then(() => {
            res.status(StatusCodes.OK).send(status.GROUP_REMOVED);
        })
        .catch((e) => {
            next({
                ...e,
                methodName: 'groupService.removeGroup',
                args:{
                    id: req.params?.id
                }
            });
        });
});

router.post('/gruops/:id', authorizationMiddleware, validator.body(groupSchema), async (req, res, next) => {
    await groupService.updateGroup(req.params.id, req.body)
        .then(() => {
            res.status(StatusCodes.OK).send(status.GROUP_UPDATED);
        })
        .catch((e) => {
            next({
                ...e,
                methodName: 'groupService.updateGroup',
                args:{
                    id: req.params?.id,
                    body: req.body
                }
            });
        });
});

router.get('/groups', authorizationMiddleware, async (req, res, next) => {
    await groupService.getAllGroups()
        .then((result) => {
            res.json(result);
        })
        .catch((e) => {
            next({
                ...e,
                methodName: 'groupService.getAllGroups'
            });
        });
});

router.get('/user-groups', authorizationMiddleware, async (req, res, next) => {
    const { groupId, userIds } = req.query;

    await userGroupService.addUsersToGroup(groupId, userIds)
        .then((result) => {
            res.json(result);
        })
        .catch((e) => {
            next({
                ...e,
                methodName: 'userGroupService.addUsersToGroup',
                args: {
                    groupId,
                    userIds
                }
            });
        });
});

export default router;
