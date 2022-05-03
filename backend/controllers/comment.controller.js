import client from '../connection.js';

const Index = 'comments';

const newComment = async (req, res) => {
    const { authorId, postId, createdAt = new Date(), content, reply = [], authorName, like = [] } = req.body

    try {
        // let err;
        client.index({
            index: Index,
            body: {
                authorId,
                postId,
                createdAt,
                content,
                reply,
                authorName,
                like
            }
        }, function (err, resp) {
            if (resp.body) {
                console.log(resp.body)
                res.send({ success: "Add comment success!" })
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

const getCommentByPost = async (req, res) => {
    // const { from = 0, size = 10 } = req.query;
    const { postId } = req.params;

    try {
        const result = await client.search({
            index: userIndex,
            // from: from,
            // size: size,
            body: {
                query: {
                    bool: {
                        must: [
                            {
                                match: {
                                    postId: postId,
                                },
                            },
                        ],
                    },
                },
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

const findCommentsReply = async (req, res) => {

}

const replyComment = async (req, res) => {

}

export { newComment, getCommentByPost }