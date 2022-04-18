import { Client } from '@elastic/elasticsearch';
import dotenv from 'dotenv';
dotenv.config();

var client = new Client({
    node: `http://${process.env.ES_USERNAME}:${process.env.ES_PASSWORD}@localhost:9200/`
});

export default client; 