import { verify, sign, JsonWebTokenError } from 'jsonwebtoken';
import { TokenPayload } from '../types';
import HttpException from '../model/http-exception.model';

export function createJwtToken(tokenPayload: TokenPayload) {
    return sign(tokenPayload, 'secret', { expiresIn: '1d' });
}

export function verifyJwt(token: string): TokenPayload | undefined {
    try {
        return verify(token, 'secret') as TokenPayload;
    } catch (err) {
        if (err instanceof JsonWebTokenError)
            throw new HttpException(401, 'Unauthorized! Token expired!')
    }
}