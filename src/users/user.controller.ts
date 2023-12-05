import { Router, Request, Response, NextFunction } from "express";
import * as userService from './user.service';
import HttpException from "../model/http-exception.model";
import auth from "../middleware/auth.middleware";

const userRouter = Router();

userRouter.post('/', auth.admin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;

        const userFound = await userService.getUserByEmail(data.email);

        if (userFound?.id) {
            throw new HttpException(400, "User already exists");
        }

        const userCreated = await userService.createUser(data);

        return res.json({ error: 0, message: 'User created!', data: userCreated })

    } catch (error) {
        next(error);
    }
})

userRouter.get('/', auth.admin, async (req: Request, res: Response, next: NextFunction) => {
    try {

        const users = await userService.getAllUsers();
        return res.json({ error: 0, message: 'all users', data: users });

    } catch (error) {
        next(error);
    }
})

export default userRouter;
