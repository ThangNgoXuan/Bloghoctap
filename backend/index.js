import express from 'express';
import client from './connection.js';
import { api } from './routers/index.js';
import cors from 'cors';

const app = express();

// parse json request body
app.use(express.json());

app.use(cors())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use('/api', api);


app.get('/api/user/:username', (req, res) => {
    client.search({
        index: 'usersdb',
        body: {
            query: {
                match: {
                    username: req.params.username
                }
            }
        }
    }, function (err, resp, status) {
        console.log(resp);
        res.send(resp)
    });

})

app.listen(5000, () => console.log('server running at 5000'));
