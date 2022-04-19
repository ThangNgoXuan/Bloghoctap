import uniqid from 'uniqid';
import client from '../connection.js';
import slugify from 'slugify';

const userIndex = 'posts';

const newPost = async (req, res) => {
    const { author, tags, isPublish = true, title, coverImg } = req.body
    let publishedAt = "";
    if (isPublish) publishedAt = Date.now()
    console.log("post")
    try {
        let err;
        client.index({
            index: userIndex,
            body: {
                "id": "p-" + uniqid(),
                "title": title,
                "slug": slugify(title),
                "tags": tags || [],
                "coverImg": coverImg || "https://www.browsewire.net/wp-content/uploads/2017/11/blog-img.jpg",
                "content": Date.now(),
                "isPublish": isPublish,
                "publishedAt": publishedAt,
                "createdAt": Date.now(),
                "author": author,
                "comments": []

            }
        }, function (err, resp) {

            if (resp.body) {
                console.log(resp.body);
                res.send({ success: "Add blog success!" })
                return;
            } else if (err) {
                err = err;
                res.status(404).send({ error: err.name });
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

    try {
        const result = await client.search({
            index: userIndex,
            body: {
                query: {
                    match: {
                        "slug": slug
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

export { newPost, getAllPost, getPostBySlug }