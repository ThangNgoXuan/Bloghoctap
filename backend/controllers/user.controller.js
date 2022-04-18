import uniqid from 'uniqid';
import catchAsync from "../middleware/catchAsync.js";
import client from '../connection.js';

const userIndex = 'usersdb';

const registUser = async (req, res) => {
    const { username, email, password, name } = req.body

    //can kiem tra email or user ton tai hay ko
    try {
        let err;
        client.index({
            index: userIndex,
            type: '_doc',
            body: {
                "id": uniqid(),
                "name": name,
                "email": email,
                "username": username,
                "password": password,
                "dateCreated": Date.now()
            }
        }, function (err, resp) {

            if (resp.body) {
                // const result = resp.body.hits.hits;
                // res.send({ total: result.length, result });
                console.log(resp.body);
                return;
            } else if (err) {
                err = err;
                res.status(404).send({ error: err.name });
                return;
            }
        });
    } catch (error) {
        res.send(error);
        // console.log(error)
    }
}

const loginUser = async (req, res) => {
    const { username, email, password } = req.body

    try {
        const result = await client.search({
            index: userIndex,
            query: {
                match: {
                    username: username,
                    password: password,
                }
            }
        })
        if (result) {
            res.send(result)
        }
    } catch (error) {
        let err = error.name ? { error: error.name } : error
        res.send(err);
    }
}

export const test = catchAsync((req, res) => {

})

export { registUser, loginUser }