import app from './app';
import logger from "./utilities/logger";
import * as cron from "node-cron";
import {collectData} from "./utilities/data-collector"

app.listen(process.env.PORT || 3000, () => {
    logger.info(`server running on port : ${process.env.PORT || 3000}`);
})

cron.schedule("0 * * * *", async () => {
    await collectData()
});
