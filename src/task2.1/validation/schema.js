import Joi from 'joi';

const PASSWORD_REGEX = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}');
const AGE_MIN = 4;
const AGE_MAX = 130;

export default Joi.object({
    login: Joi.string().required(),
    password: Joi.string().pattern(PASSWORD_REGEX).required(),
    age: Joi.number().integer().min(AGE_MIN).max(AGE_MAX).required()
});
