import express from 'express';
import { Application } from 'express';
import * as bodyParser from 'body-parser';
import { MainRouter } from './routes/routes';
import { loadErrorHandlers } from './utilities/error-handling';
import cors from 'cors';

import './db'; // initialize database

const app: Application = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1/', MainRouter);
loadErrorHandlers(app);

export default app;
