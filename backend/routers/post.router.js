import express from 'express';
const postRouter = express.Router();
import { newPost, getAllPost } from '../controllers/post.controller.js'

postRouter.route('/')
    .get(getAllPost)
    .post(newPost)

export default postRouter;
