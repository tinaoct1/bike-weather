
import express from 'express';
import { Application } from 'express';
import * as bodyParser from 'body-parser';
import { MainRouter } from './routes/routes';
import { loadErrorHandlers } from './utilities/error-handling';
// import session from 'express-session';
// import helmet from "helmet";
import './db'; // initialize database




const app: Application = express();
// connect({db});
// app.use(helmet());
app.use(bodyParser.json());

app.use('/api/v1/', MainRouter);

loadErrorHandlers(app);

export default app;