import winstonLogger from '../winston-logger';

const errorMiddleware = (
    err,
    req,
    res,
    // eslint-disable-next-line
    next
) =>  {
    const status = 'status' in err ? err.status : 500;
    const message = err.message || 'Internal Server Error';

    winstonLogger.error(err.name, { 'path':req.path, 'body':req.body, 'params':req.params, 'query':req.query, 'message': err.message, 'methodName': err?.methodName, 'args':  err?.args });

    res.status(status).send({
        status,
        message
    });
};

export default errorMiddleware;
