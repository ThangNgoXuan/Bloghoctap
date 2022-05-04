import express from 'express';
const postRouter = express.Router();
import { newPost, getAllPost, getPostBySlug, searchPosts, getPostByUser } from '../controllers/post.controller.js'
import multer from 'multer';
import { isAuth } from '../middleware/auth.middleware.js';

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        // cb(null, file.originalname);
        cb(null, file.fieldname + '-' + Date.now())
    },
});

const upload = multer({ storage: storage });

postRouter.route('/mypost').post(isAuth, getPostByUser);
postRouter.route('/search').get(searchPosts);
postRouter.route('/:slug').get(getPostBySlug);

postRouter.route('/')
    .get(getAllPost)
// .post(isAuth,upload.single("image"),  newPost)
postRouter.post("/", upload.single("image"), isAuth, newPost)
export default postRouter;
