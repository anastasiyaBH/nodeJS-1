import jwt from 'jsonwebtoken';
import APP_CONFIG from '../../config';
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

    return jwt.verify(jwtToken, APP_CONFIG.JWT_SECRET, { maxAge: APP_CONFIG.JWT_TOKEN_EXPIRATION }, (err) => {
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
