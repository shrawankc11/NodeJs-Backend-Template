import { Router, Request, Response, NextFunction } from 'express';
import * as userService from '../users/user.service';
import HttpException from '../model/http-exception.model';
import { createJwtToken } from '../utils/token.util';

const authRouter = Router();

authRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { email, password } = req.body;

        const userFound = await userService.getUserByEmail(email);

        if (userFound?.id === undefined) {
            throw new HttpException(401, 'Unauthorized, User not found!')
        }

        const compareResult = await userService.comparePassword(password, userFound.passwordHash);

        if (compareResult === false) {
            throw new HttpException(401, 'Incorrect credentials!');
        }

        const token = createJwtToken({ email, id: userFound.id, role: userFound.role });

        return res.status(200).json({ error: 0, message: 'Logged in', data: { token, email: userFound.email } });
    } catch (error) {
        next(error);
    }
});

export default authRouter;