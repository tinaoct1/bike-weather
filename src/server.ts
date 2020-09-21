import app from './app';
import logger from "./utilities/logger";

app.listen(process.env.PORT || 3000, () => {
    logger.info(`server running on port : ${process.env.PORT || 3000}`);
})