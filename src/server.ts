// import express, { Request, Response, Application } from 'express';
//
// import routes from './routes/routes';
// import connect from './db';
//
// const app: Application = express();
//
// const PORT = 8080;
//
// app.get('/', (req: Request, res: Response) => res.send('Express + TypeScript Server'));
// app.listen(PORT, () => {
//     console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
// });
//
// const db = 'mongodb+srv://admin:C5bRGWNMy9yz89Rx@cluster0.u4wgj.gcp.mongodb.net/indego?retryWrites=true&w=majority';
// connect({db});
// routes({app});
//
//
//
import app from './app';
import { APP_PORT } from "./utilities/secrets";
import logger from "./utilities/logger";

app
    .listen(APP_PORT, () => {
        logger.info(`server running on port : ${APP_PORT}`);
        console.log(`server running on port : ${APP_PORT}`);
    })
    .on('error', (e) => logger.error(e));