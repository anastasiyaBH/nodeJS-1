import express from 'express';

import routes from './routes';

const app = express();

app.listen(process.env.PORT || 8080);

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(routes);

