import generateToken from '../utils/generateToken.js';
import client from '../connection.js';
import bcrypt from 'bcryptjs';

const userIndex = 'users';

const registUser = async (req, res) => {
    const { email, password, name } = req.body

    try {
        const existsUser = await client.search({
            index: userIndex,
            body: {
                query: {
                    bool: {
                        filter: {
                            term: {
                                email: {
                                    value: email
                                }
                            }
                        }
                    }
                }
            }
        })
        if (existsUser && existsUser.body.hits.hits.length > 0) {
            res.status(400).send({ error: 'Tài khoản đã tồn tại' })
        } else {

            bcrypt.hash(password, 10, async (err, hash) => {
                if (err) {
                    return res.status(500).send({ error: "Internal server error" });
                }
                else {
                    let error;
                    client.index({
                        index: userIndex,
                        type: '_doc',
                        body: {
                            "name": name,
                            "email": email,
                            "password": hash,
                            "avatar": "https://www.iconpacks.net/icons/2/free-user-icon-3297-thumb.png",
                            "dateCreated": Date.now()
                        }
                    }, function (err, resp) {

                        if (resp.body) {
                            // const result = resp.body.hits.hits;
                            res.send({ success: "Đăng ký tài khoản thành công!" });
                            console.log(resp.body);
                            return;
                        } else if (err) {
                            error = err;
                            res.status(404).send({ error: error.name });
                            return;
                        }
                    });
                }
            });


        }

    } catch (error) {
        res.send(error);
        console.log(error)
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const result = await client.search({
            index: userIndex,
            body: {
                query: {
                    bool: {
                        filter: {
                            term: {
                                email: {
                                    value: email
                                }
                            }
                        }
                    }
                }
            }
        })
        const users = result.body.hits.hits;
        console.log(users)
        if (users.length === 0) {
            res.status(400).send({ error: "Tài khoản không tồn tại" })
        } else {
            console.log(users[0]._source.password)
            bcrypt.compare(password, users[0]._source.password, async (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(500).send({ error: "Internal server error" });
                }
                if (!result) {
                    return res.status(401).send({ error: "Sai mật khẩu" });
                }
                const user = {
                    name: users[0]._source.name,
                    id: users[0]._id,
                    avatar: users[0]._source.avatar,
                    token: generateToken(users[0]._id),
                }
                res.status(200).send({ ...user });
                return;
            });

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

const getUserProfile = async (req, res) => {

    const { _id } = req.body;

    const user = await client.search({
        index: userIndex,
        body: {
            query: {
                match: {
                    _id: _id
                }
            }
        }
    });

    if (user && user.body.hits.total.value >= 1) {
        const data = user.body.hits.hits[0];
        const userProfile = {
            _id: data._id,
            name: data._source.name,
            email: data._source.email,
            avatar: data._source.avatar,
        }
        res.status(200).send(userProfile);
    } else {
        res.status(401).send({ error: "Không tìm thấy user" })
    }
}

const searchUser = async (req, res) => {
    const query = req.query.query;
    //  console.log(query)
    if (query) {
        try {

            const result = await client.search({
                index: userIndex,
                body: {
                    query: {
                        multi_match: {
                            fields: ['name', 'email'],
                            query: query,
                            // type: 'phrase_prefix',
                        }
                    },

                }
            });
            if (result) {
                const data = result.body.hits.hits;
                res.status(200).send(data);
            }
        } catch (error) {
            console.log(error)
            let err = error.name ? { error: error.name } : error
            res.send(err);
        }
    }

}

export { registUser, loginUser, getAll, getUserProfile, searchUser }