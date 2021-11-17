import express from 'express';
import { StatusCodes } from 'http-status-codes';
import joiValidator from 'express-joi-validation';

import status from './status';
import userService from '../services';

import schema from '../validation/schema';

const router = express.Router();

const validator = joiValidator.createValidator({});

router.get('/', (req, res) => {
    res.status(StatusCodes.OK).send(status.REST_AVAILABLE);
});

router.post('/user', validator.body(schema), async (req, res, next) => {
    await userService.createUser(req.body)
        .then(() => {
            res.status(StatusCodes.CREATED).send(status.CREATED);
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
            res.status(StatusCodes.OK).send(status.REMOVED);
        })
        .catch((e) => next(e));
});

router.post('/users/:id', validator.body(schema), async (req, res, next) => {
    await userService.updateUser(req.params.id, req.body)
        .then(() => {
            res.status(StatusCodes.OK).send(status.UPDATED);
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

export default router;
