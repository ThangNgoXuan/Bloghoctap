import express from 'express';
const userRouter = express.Router();

import client from '../connection.js';
import { createUser, createUserPolicy } from '../validations/user.validation.js'
import validate from '../middleware/validate.js'
import { test, registUser, loginUser } from '../controllers/user.controller.js'

userRouter.get('/', async (req, res) => {
    await client.search({
        index: 'usersdb',
        type: "_doc",
        body: {
            query: { match_all: {} }
        }
    }, function (err, resp, status) {
        // console.log(resp);
        // console.log(err);
        console.log(resp);
        // console.log(status);
        if (resp.body) {
            const result = resp.body.hits.hits;
            res.send({ total: result.length, result });
            return;
        }
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

// userRouter.post('/user', async (req, res) => {

//     const { first_name, last_name, id, email, gender, username } = req.body;
//     console.log(req.body)
//     client.index({
//         index: 'usersdb',
//         type: '_doc',
//         body: {
//             "id": id,
//             "first_name": first_name,
//             "last_name": last_name,
//             "email": email,
//             "username": username,
//             "gender": gender,
//         }
//     }, function (err, resp, status) {
//         // console.log(resp);
//         res.send(resp);
//     });

// })

userRouter.post('/user', validate(createUser), registUser)
userRouter.post('/user/login', loginUser)

export default userRouter;
