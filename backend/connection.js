import { Client } from '@elastic/elasticsearch';

var client = new Client({
    node: 'http://elastic:AGYv2FfYe5nCqFXovu2D@localhost:9200/'
});

export default client; 