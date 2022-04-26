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
                            res.send({ success: "Create user success" });
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
                    token: generateToken(users[0]._id),
                }
                res.status(200).send({ success: "Đăng nhập thành công", user });
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

export { registUser, loginUser, getAll }