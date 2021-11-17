const errorMiddleware = (
    err,
    req,
    res,
    // eslint-disable-next-line
    next
) =>  {
    const status = 'status' in err ? err.status : 500;
    const message = err.message || 'Something went wrong :(';

    res.status(status).send({
        status,
        message
    });
};

export default errorMiddleware;
