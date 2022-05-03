import uniqid from 'uniqid';
import client from '../connection.js';
import slugify from 'slugify';
import { v2 as cloudinary } from 'cloudinary'

const userIndex = 'posts';

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;
cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
});


const newPost = async (req, res) => {
    const { tags, isPublish = true, title, content, authorName, date } = req.body
    let publishedAt = "";
    if (isPublish) publishedAt = new Date();
    let coverImg = "";
    let cloudinaryId = ""
    // console.log(req.body)
    if (req.file) {
        await cloudinary.uploader.upload(
            req.file.path,
            { folder: "blog" },
            (err, result) => {
                if (err) {
                    res.status(500).json({
                        error: "Internal server error",
                    });
                }
                coverImg = result.secure_url;
                console.log(coverImg)
                cloudinaryId = result.public_id;
            }
        );
    }

    const newPost = {
        id: "p-" + uniqid(),
        title: title,
        slug: slugify(title),
        tags: tags.split(",") || [],
        coverImg: coverImg,
        content: content,
        isPublish: isPublish,
        publishedAt: publishedAt,
        createdAt: date || new Date(),
        authorId: req.user.id,
        authorName: req.user.name,
        likes: [],
        cloudinaryId: cloudinaryId,
    }

    try {
        // let err;
        client.index({
            index: userIndex,
            body: newPost
        }, function (err, resp) {
            if (resp.body) {
                console.log(resp.body)
                res.send({ success: "Add blog success!" })
                return;
            } else if (err) {
                console.log(err)
                res.status(404).send({ error: err });
                return;
            }
        });
    } catch (error) {
        res.send(error);
        console.log(error)
    }
}

const getAllPost = async (req, res) => {
    const { from = 0, size = 10 } = req.query;

    try {
        const result = await client.search({
            index: userIndex,
            from: from,
            size: size,
            // type: "_doc",
            body: {
                query: { match_all: {} }
            },

        });
        if (result.body) {
            const data = result.body.hits.hits;
            res.send({ total: data.length, data });
            return;
        }
    } catch (error) {
        let err = error.name ? { error: error.name } : error
        res.send(err);
    }
}

const getPostBySlug = async (req, res) => {
    const { slug } = req.params;
    console.log(slug)

    try {
        const result = await client.search({
            index: userIndex,
            body: {
                query: {
                    match: {
                        slug
                    }
                }
            },

        });
        if (result.body) {
            const data = result.body.hits.hits;
            res.send({ total: data.length, data });
            return;
        }
    } catch (error) {
        let err = error.name ? { error: error.name } : error
        res.send(err);
    }
}

const searchPosts = async (req, res) => {
    const { q, hashtag } = req.query;
    let keyword = q;
    console.log("req.query")
    console.log(req.query)
    if (hashtag) {
        keyword = "#" + hashtag;
    }

    try {
        const result = await client.search({
            index: userIndex,
            body: {
                query: {
                    multi_match: {
                        query: keyword,
                        fields: ['title', 'tags', 'content']
                    }
                }
            },

        });
        if (result.body) {
            const data = result.body.hits.hits;
            res.send({ total: data.length, data });
            return;
        }
    } catch (error) {
        let err = error.name ? { error: error.name } : error
        res.send(err);
    }
}

const getPostByUser = async (req, res) => {
    const { userId } = req.params;
    console.log(userId)

    try {
        const result = await client.search({
            index: userIndex,
            body: {
                query: {
                    match: {
                        author: userId
                    }
                }
            },

        });
        if (result.body) {
            // console.log(result)
            const data = result.body.hits.hits;
            res.send({ total: data.length, data });
            return;
        }
    } catch (error) {
        let err = error.name ? { error: error.name } : error
        res.send(err);
    }
}


export { newPost, getAllPost, getPostBySlug, searchPosts, getPostByUser }