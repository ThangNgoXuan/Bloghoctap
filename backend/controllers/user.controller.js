import generateToken from '../utils/generateToken.js';
import client from '../connection.js';

const userIndex = 'users';

const registUser = async (req, res) => {
    const { username, email, password, name } = req.body

    //can kiem tra email or user ton tai hay ko
    try {
        let err;
        client.index({
            index: userIndex,
            type: '_doc',
            body: {
                "name": name,
                "email": email,
                "username": username,
                "password": password,
                "dateCreated": Date.now()
            }
        }, function (err, resp) {

            if (resp.body) {
                // const result = resp.body.hits.hits;
                res.send({ success: "Create user success" });
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
    const { username, password } = req.body
    console.log(username)
    try {
        const result = await client.search({
            index: userIndex,
            body: {
                query: {
                    bool: {
                        must: [
                            { match: { username: username } },
                            { match: { password: password } },
                        ]
                    }
                }
            }
        })
        if (result.body.hits.total.value >= 1) {
            // console.log(result.body.hits.hits)
            const data = result.body.hits.hits[0];
            const user = {
                name: data._source.name,
                id: data._id,
                token: generateToken(data._id),
            }
            res.send({ success: "Đăng nhập thành công", user });
            return;
        } else {
            res.send({ error: "Sai tài khoản hoặc mật khẩu" })
        }
    } catch (error) {
        console.log(error)
        let err = error.name ? { error: error.name } : error
        res.send(err);
    }
}

const getAll = async (req, res) => {
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

export { registUser, loginUser, getAll }