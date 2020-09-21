import { Application, Request, Response } from 'express';
import { IS_PRODUCTION } from "./secrets";
import logger from "./logger";

export function loadErrorHandlers(app: Application) {
    app.use((err: any, req: Request, res: Response, next: any) => {
        if (err.name === 'ValidationError') {
            return res.status(422).json({
                errors: Object.keys(err.errors).reduce(function (errors: any, key: string) {
                    errors[key] = err.errors[key].message;

                    return errors;
                }, {})
            });
        }

        if (err.message === "Forbidden") {
            err.status = 403
        }

        logger.error(err);
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
                error  : !IS_PRODUCTION ? err : {}
            }
        });
    });

}