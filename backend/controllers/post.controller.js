import uniqid from 'uniqid';
import client from '../connection.js';
import slugify from 'slugify';
import { v2 as cloudinary } from 'cloudinary'

const postIndex = 'posts';

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
            index: postIndex,
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
            index: postIndex,
            from: from,
            size: size,
            // type: "_doc",
            body: {
                query: { match_all: {} },
                sort: [{ publishedAt: { order: 'desc' } }],
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
            index: postIndex,
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
            index: postIndex,
            body: {
                query: {
                    bool: {
                        must: {
                            multi_match: {
                                query: keyword,
                                fields: ['title^3', 'tags^2', 'content']
                            }
                        }
                    }

                },
                sort: [{ publishedAt: { order: 'asc' } }],
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
    // const { userId } = req.params;
    try {
        const result = await client.search({
            index: postIndex,
            body: {
                query: {
                    match: {
                        authorId: req.user.id
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

const listPostByTag = async (tag) => {
    const result = await client.search({
        index: postIndex,
        size: 5,
        body: {
            query: {
                match: {
                    tags: tag
                }
            },
        }
    })

    const kq = result.body.hits.hits.map(item => {
        return {
            _id: item._id,
            title: item._source.title,
            authorName: item._source.authorName,
            authorId: item._source.authorId,
            likes: item._source.likes,
            tags: item._source.tags,
        }
    });

    return kq;
}

const getPopularTagsWithPost = async (req, res) => {
    try {
        const result = await client.search({
            index: postIndex,
            size: 0,
            body: {
                aggs: {
                    tags: {
                        terms: {
                            field: "tags.keyword"
                        }
                    }
                }
            }

        });

        if (result?.body?.aggregations?.tags?.buckets) {
            let tags = result.body.aggregations.tags.buckets.map((item) => item.key)
            tags.splice(3)

            const tag1 = await listPostByTag(tags[0])
            const tag2 = await listPostByTag(tags[1])
            const tag3 = await listPostByTag(tags[2])

            const listPosts = [
                {
                    tag: tags[0],
                    data: tag1
                },
                {
                    tag: tags[1],
                    data: tag2
                },
                {
                    tag: tags[2],
                    data: tag3
                }
            ]

            res.send(listPosts)
        }
    } catch (error) {
        console.log(error)
        let err = error.name ? { error: error.name } : error
        res.send(err);
    }
}

export { newPost, getAllPost, getPostBySlug, searchPosts, getPostByUser, getPopularTagsWithPost }