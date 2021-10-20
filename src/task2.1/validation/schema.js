import Joi from 'joi';

import {users} from "../services";

const PASSWORD_REGEX = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}');
const AGE_MIN = 4;
const AGE_MAX = 130;

const loginValidation = (login) => {
   if(users.some(user => user.login === login)) {
       throw new Error('this login already exists');
   }

   return login;
}

export default Joi.object({
    login: Joi.string().custom(loginValidation, 'Login validation').required(),
    password: Joi.string().pattern(PASSWORD_REGEX).required(),
    age: Joi.number().integer().min(AGE_MIN).max(AGE_MAX).required(),
});
