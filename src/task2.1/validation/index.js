import { StatusCodes } from 'http-status-codes';

const errorResponse = (schemaErrors) => {
    const errors = schemaErrors.map((error) => {
        const {path, message} = error;
        return {path, message};
    })

    return {
        status: 'failed',
        errors,
    }
}

export const validateSchema = (schema) => {
    return (req, res, next) => {
        const a = schema.validate(req.body, {abortEarly: false});
        console.log(a)

        const {error} = a;

        if(error.isJoi) {
            res.status(StatusCodes.BAD_REQUEST).json(errorResponse(error.details))
        } else {
            next();
        }
    }
}

export default validateSchema;
