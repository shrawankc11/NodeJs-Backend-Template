import HttpException from '../model/http-exception.model';
import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/token.util';
import { TokenPayload } from '../types';

const extractTokenFromHeader = (req: Request): string => {
    const token: string | undefined = req.get('authorization');

    if (!token) {
        throw new HttpException(401, 'Unauthorized, Token not found!');
    }

    if (token.substring(0, 7).toLowerCase() !== 'bearer ') {
        throw new HttpException(401, 'Unauthorized, Bearer missing from the token!');
    }

    return token.substring(7);
};

export function checkRole(roles: string[]) {
    return (req: Request, _res: Response, next: NextFunction) => {
        const token = extractTokenFromHeader(req);

        const payload = verifyJwt(token) as TokenPayload;
        console.log(payload);

        if (roles.indexOf(payload.role) === -1) {
            throw new HttpException(401, 'Unauthorized!');
        }

        req['user'] = payload;
        next();
    };
}

export default Object.freeze({
    admin: checkRole(['admin']),
    all: checkRole(['admin', 'staff']),
});