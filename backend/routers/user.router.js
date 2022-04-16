import express from 'express';
import client from '../connection.js';

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
    await client.search({
        index: 'usersdb',
        type: "_doc",
        body: {
            query: { match_all: {} }
        }
    }, function (err, resp, status) {
        // console.log(resp);
        const result = resp.body.hits.hits;
        res.send({ total: result.length, result })
    });

});

userRouter.get('/search', async (req, res) => {

    const query = req.query.query;
    //  console.log(query)
    if (query) {
        const result = await client.search({
            index: 'usersdb',
            type: '_doc',
            body: {
                query: {
                    multi_match: {
                        fields: ['first_name', 'last_name', 'email', 'username', 'gender'],
                        query: query,
                        // type: 'phrase_prefix',
                    }
                },

            }
        });
        // console.log(result)
        const data = result.body.hits.hits;

        res.send(data);
        // res.send(result);
    }

})

userRouter.post('/user', async (req, res) => {

    const { first_name, last_name, id, email, gender, username } = req.body;
    console.log(req.body)
    client.index({
        index: 'usersdb',
        type: '_doc',
        body: {
            "id": id,
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "username": username,
            "gender": gender,
        }
    }, function (err, resp, status) {
        // console.log(resp);
        res.send(resp);
    });

})


export default userRouter;
