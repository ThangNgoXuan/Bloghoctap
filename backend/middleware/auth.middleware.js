import client from '../connection.js';
import jwt from 'jsonwebtoken';

export const isAuth = async (req, res, next) => {
    try {
        const token = req.body.token;
        console.log("auth")
        console.log(token)
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            const user = await client.search({
                index: 'users',
                body: {
                    query: {
                        match: {
                            _id: decoded.id
                        }
                    }
                }
            });
            if (user && user?.body?.hits?.total?.value >= 1) {
                const newUser = user.body.hits.hits[0]._source;
                const userID = user.body.hits.hits[0]._id;
                delete newUser['password']
                newUser.id = userID;
                console.log(newUser)
                req.user = newUser;
                next()
            }
            // else{
            //     res.send()
            // }
        } else {
            res.status(401).send({ message: 'No token' });
            // res.send({ message: 'No token' });
        }

    } catch (error) {
        //res.send({ message: error.message });
        console.log(error)
    }

};