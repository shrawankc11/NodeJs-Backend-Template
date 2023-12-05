import { Response } from "express";

export default function (
    res: Response,
    data: any,
    messageData: [string, boolean?],
    statusCode?: number) {

    const [message, error] = messageData;
    return res.status(statusCode || 200).json({
        error: error ? 1 : 0,
        [error ? 'errorMessage' : 'message']: message,
        data
    })
}
