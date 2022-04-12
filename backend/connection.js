import { Client } from '@elastic/elasticsearch';

var client = new Client({
    //node: 'http://localhost:9200',
    // auth: {
    //     username: 'elastic',
    //     password: 'AGYv2FfYe5nCqFXovu2D',
    // }
    node: 'http://elastic:AGYv2FfYe5nCqFXovu2D@localhost:9200/'
});

export default client; 