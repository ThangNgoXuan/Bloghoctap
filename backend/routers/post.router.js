import express from 'express';
const postRouter = express.Router();
import { newPost, getAllPost, getPostBySlug, searchPosts, getPostByUser } from '../controllers/post.controller.js'

postRouter.route('/author/:userId').get(getPostByUser);
postRouter.route('/search').get(searchPosts);
postRouter.route('/:slug').get(getPostBySlug);

postRouter.route('/')
    .get(getAllPost)
    .post(newPost)

export default postRouter;
