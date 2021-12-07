import { format } from 'date-fns';
import isEmpty from 'lodash.isempty';

const loggerMiddleware = (
    req,
    res,
    next
) =>  {
    const time = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

    const reqType = req.method;
    const path = req.originalUrl;
    const status = res.statusCode;

    const body = !isEmpty(req.body) ? `body: ${JSON.stringify(req.body)} \n` : '';
    const params = !isEmpty(req.params) ? `params: ${JSON.stringify(req.params)} \n` : '';
    const query = !isEmpty(req.query) ? `query ${JSON.stringify(req.query)} \n` : '';

    const logString = `[${time}] ${reqType} ${path} ${status}\n${body}${params}${query}`;

    console.log(logString);
    next();
};

export default loggerMiddleware;
