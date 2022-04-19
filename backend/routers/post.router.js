import express from 'express';
const postRouter = express.Router();
import { newPost, getAllPost, getPostBySlug } from '../controllers/post.controller.js'

postRouter.route('/:slug').get(getPostBySlug)

postRouter.route('/')
    .get(getAllPost)
    .post(newPost)

export default postRouter;
