import Joi from 'joi';

const PASSWORD_REGEX = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}');
const AGE_MIN = 4;
const AGE_MAX = 130;

export const userSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().pattern(PASSWORD_REGEX).required(),
    age: Joi.number().integer().min(AGE_MIN).max(AGE_MAX).required()
});

const permissionTypes = {
    READ: 'READ',
    WRITE: 'WRITE',
    DELETE: 'DELETE',
    SHARE: 'SHARE',
    UPLOAD_FILES: 'UPLOAD_FILES'
};

export const groupSchema = Joi.object({
    name: Joi.string().required(),
    permissions: Joi.array().items(Joi.string().valid(...Object.values(permissionTypes)))
});
