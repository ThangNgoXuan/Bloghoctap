import express from 'express';
import userRouter from './user.router.js';
import postRouter from './post.router.js';

const router = express.Router();

router.use('/user', userRouter);

router.use('/post', postRouter);

export const api = router;