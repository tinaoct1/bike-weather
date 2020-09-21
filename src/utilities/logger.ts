import { createLogger, format, transports } from 'winston';

import { ENVIRONMENT } from "./secrets";


const logLevel = ENVIRONMENT === 'dev' ? 'debug' : 'warn';

export default createLogger({
    transports       : [
        new transports.Console({
            stderrLevels: ["info", "error"],
            format: format.combine(format.errors({stack: true}), format.prettyPrint()),
        }),
    ],
    exitOnError      : false, // do not exit on handled exceptions
});
