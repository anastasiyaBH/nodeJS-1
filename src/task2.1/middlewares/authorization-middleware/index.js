import jwt from 'jsonwebtoken';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

const authorizationMiddleware = (
    req,
    res,
    next
) =>  {
    const jwtToken = req.headers?.authorization;

    if (!jwtToken) {
        res.status(StatusCodes.UNAUTHORIZED).send({
            status: StatusCodes.UNAUTHORIZED,
            message: ReasonPhrases.UNAUTHORIZED
        });
    }

    if (!process.env.JWT_SECRET || !process.env.JWT_TOKEN_EXPIRATION) {
        throw new Error('JWT Credentials Error');
    }

    return jwt.verify(jwtToken, process.env.JWT_SECRET, { maxAge: process.env.JWT_TOKEN_EXPIRATION }, (err) => {
        if (err) {
            res.status(StatusCodes.FORBIDDEN).send({
                status: StatusCodes.FORBIDDEN,
                message: ReasonPhrases.FORBIDDEN
            });
        }

        return next();
    });
};

export default authorizationMiddleware;
