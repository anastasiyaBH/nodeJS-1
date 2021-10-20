import express from 'express';
import { StatusCodes } from 'http-status-codes';
import joiValidator from 'express-joi-validation';

import status from './status';
import {
    createUser,
    getUserById,
    removeUser,
    updateUser,
    getAutoSuggestUsers
} from '../services';

import schema from '../validation/schema';

const router = express.Router();

const validator = joiValidator.createValidator({});

router.get('/', (req, res) => {
    res.status(StatusCodes.OK).send(status.REST_AVAILABLE);
})

router.post('/user', validator.body(schema), (req, res) => {
    createUser(req.body);
    res.status(StatusCodes.CREATED).send(status.CREATED);
});

router.get('/users/:id', (req, res) => {
    const user = getUserById(req.params?.id);
    res.json(user);
});

router.delete('/users/:id', (req, res) => {
    removeUser(req.params?.id);
    res.status(StatusCodes.OK).send(status.REMOVED);
});

router.post('/users/:id', validator.body(schema), (req, res) => {
    updateUser(req.params.id,req.body);
    res.status(StatusCodes.OK).send(status.UPDATED);
})

router.get('/users',(req, res) => {
    const searchQuery = req.query.query;
    const limit = req.query.limit || 10;
    getAutoSuggestUsers(searchQuery, limit);
    res.json(getAutoSuggestUsers(searchQuery, limit));
})

export default router;
