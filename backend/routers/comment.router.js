import express from 'express';
const commentRouter = express.Router();
import { isAuth } from '../middleware/auth.middleware.js';
import { getCommentByPost, newComment } from '../controllers/comment.controller.js'

commentRouter.get('/:postId', getCommentByPost);
commentRouter.post('/', isAuth, newComment);

export default commentRouter;
