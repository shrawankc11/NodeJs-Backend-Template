import { Router } from 'express';
import authRouter from '../auth/auth.controller';
import userRouter from '../users/user.controller';

const apiRouter = Router()
    .use('/auth', authRouter)
    .use('/user', userRouter);


export default apiRouter;