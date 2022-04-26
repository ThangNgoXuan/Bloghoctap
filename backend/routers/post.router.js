import express from 'express';
const postRouter = express.Router();
import { newPost, getAllPost, getPostBySlug, searchPosts } from '../controllers/post.controller.js'

postRouter.route('/:slug').get(getPostBySlug)
postRouter.route('/search/:keyword').get(searchPosts);

postRouter.route('/')
    .get(getAllPost)
    .post(newPost)

export default postRouter;
