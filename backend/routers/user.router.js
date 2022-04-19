import express, { Router } from 'express';
const userRouter = express.Router();

import client from '../connection.js';
import { createUser, createUserPolicy } from '../validations/user.validation.js'
import validate from '../utils/validate.js'
import { registUser, loginUser, getAll } from '../controllers/user.controller.js'

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

userRouter.route('/').get(getAll).post(validate(createUser), registUser)

userRouter.post('/login', loginUser)

export default userRouter;
