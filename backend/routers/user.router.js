import express from 'express';
import client from '../connection.js';

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
    await client.search({
        index: 'usersdb',
        body: {
            query: { match_all: {} }
        }
    }, function (err, resp, status) {
        console.log(resp);
        res.send(resp)
    });

});

userRouter.get('/search', async (req, res) => {

    const query = req.query.query;
    console.log(query)
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




export default userRouter;
