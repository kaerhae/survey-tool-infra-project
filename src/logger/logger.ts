import { application, Request, Response } from "express";
import pino from "pino";
import type { LokiOptions } from "pino-loki";

const lokiUrl = process.env.LOKI_HOST;
const lokiPort = process.env.LOKI_PORT;

const transport = pino.transport<LokiOptions>({
    targets: [
         {
            target: "pino-loki",
            options: {
                batching: true,
                interval: 5,

                host: `http://${lokiUrl}:${lokiPort}`,
                labels: {
                    application: "survey-tool",
                },
            }
         },
         {
            target: "pino-pretty",
         }
    ]
});

const logger = pino(transport);

export const logRequest = (req: Request) => {
    const reqObject = {
        "log_type": "request",
        "requested_url": req.url,
        "incoming_ip": req.ip,
        "forwarded_ip": req.headers["X-Forwarded-For"],
        "real_ip": req.headers["X-Real-Ip"],
        "user_agent": req.headers['user-agent'],
        "path": req.path,
        "method": req.method,
        "params": req.params,
    }

    logger.info(reqObject, `New request was made to path ${req.url}`)
}


export const logResponse = (res: Response, elapsed: number) =>  {
    const resObject = {
        "log_type": "response",
        "status_code": res.statusCode,
        "content_type": res.contentType,
        "content_length": res.strictContentLength,
        "response_time": elapsed
    };

    logger.info(resObject, "Response was sent")
}

export const logError = (res: Response, errMsg: string) =>  {
    const resObject = {
        "log_type": "response",
        "status_code": res.statusCode,
        "content_type": res.contentType,
        "content_length": res.strictContentLength,
    };

    logger.error(resObject, errMsg);
}