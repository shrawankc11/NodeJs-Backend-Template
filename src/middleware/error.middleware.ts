import { Request, Response, NextFunction } from "express";
import responseMiddleware from "./response.middleware";
import HttpException from "../model/http-exception.model";

export default function (err: Error, _req: Request, res: Response, next: NextFunction) {

    if (err instanceof (HttpException)) {
        responseMiddleware(res, null, [err.message, true], err.statuCode);
    } else {
        responseMiddleware(res, null, ['Server Error', true], 500);
    }

    return next(err);
}