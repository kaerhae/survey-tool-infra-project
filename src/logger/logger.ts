import { Request, Response } from "express";
import pino from "pino";

const logger = pino();

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


export const logResponse = (res: Response, receivedAt: number) =>  {
    const elapsed = Date.now() - receivedAt;
    const resObject = {
        "log_type": "response",
        "status_code": res.statusCode,
        "content_type": res.contentType,
        "content_length": res.strictContentLength,
        "response_time": elapsed
    };

    logger.info(resObject, "Response was sent")
}

export const logError = (res: Response, errMsg: string, receivedAt: number) =>  {
    const elapsed = Date.now() - receivedAt;
    const resObject = {
        "log_type": "response",
        "status_code": res.statusCode,
        "content_type": res.contentType,
        "content_length": res.strictContentLength,
        "response_time": elapsed
    };

    logger.error(resObject, errMsg);
}