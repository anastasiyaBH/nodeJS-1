import express from 'express';
import { StatusCodes } from 'http-status-codes';
import joiValidator from 'express-joi-validation';

import status from './status';
import { userService, groupService, userGroupService } from '../services';

import { userSchema, groupSchema } from '../validation/schema';

const router = express.Router();

const validator = joiValidator.createValidator({});

router.get('/', (req, res) => {
    res.status(StatusCodes.OK).send(status.REST_AVAILABLE);
});

router.post('/user', validator.body(userSchema), async (req, res, next) => {
    await userService.createUser(req.body)
        .then(() => {
            res.status(StatusCodes.CREATED).send(status.USER_CREATED);
        })
        .catch((e) => next(e));
});

router.get('/users/:id', async (req, res, next) => {
    await userService.getUserById(req.params?.id)
        .then((user) => {
            if (!user) {
                res.status(StatusCodes.NOT_FOUND).send(status.USER_NOT_FOUND);
            } else {
                res.json(user);
            }
        })
        .catch((e) => next(e));
});

router.delete('/users/:id', async (req, res, next) => {
    await userService.removeUser(req.params?.id)
        .then(() => {
            res.status(StatusCodes.OK).send(status.USER_REMOVED);
        })
        .catch((e) => next(e));
});

router.post('/users/:id', validator.body(userSchema), async (req, res, next) => {
    await userService.updateUser(req.params.id, req.body)
        .then(() => {
            res.status(StatusCodes.OK).send(status.USER_UPDATED);
        })
        .catch((e) => next(e));
});

router.get('/users', async (req, res, next) => {
    const searchQuery = req.query.query;
    const limit = req.query.limit;
    await userService.getAutoSuggestUsers(searchQuery, limit)
        .then((result) => {
            res.json(result);
        })
        .catch((e) => next(e));
});


router.post('/group', validator.body(groupSchema), async (req, res, next) => {
    await groupService.createGroup(req.body)
        .then(() => {
            res.status(StatusCodes.CREATED).send(status.GROUP_CREATED);
        })
        .catch((e) => next(e));
});

router.get('/groups/:id', async (req, res, next) => {
    await groupService.getGroupById(req.params?.id)
        .then((user) => {
            if (!user) {
                res.status(StatusCodes.NOT_FOUND).send(status.GROUP_NOT_FOUND);
            } else {
                res.json(user);
            }
        })
        .catch((e) => next(e));
});

router.delete('/groups/:id', async (req, res, next) => {
    await groupService.removeGroup(req.params?.id)
        .then(() => {
            res.status(StatusCodes.OK).send(status.GROUP_REMOVED);
        })
        .catch((e) => next(e));
});

router.post('/gruops/:id', validator.body(groupSchema), async (req, res, next) => {
    await groupService.updateGroup(req.params.id, req.body)
        .then(() => {
            res.status(StatusCodes.OK).send(status.GROUP_UPDATED);
        })
        .catch((e) => next(e));
});

router.get('/groups', async (req, res, next) => {
    await groupService.getAllGroups()
        .then((result) => {
            res.json(result);
        })
        .catch((e) => next(e));
});

router.get('/user-groups', async (req, res, next) => {
    const { groupId, userIds } = req.query;

    await userGroupService.addUsersToGroup(groupId, userIds)
        .then((result) => {
            res.json(result);
        })
        .catch((e) => next(e));
});

export default router;
