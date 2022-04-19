import { Client } from '@elastic/elasticsearch';

var client = new Client({
    node: 'http://elastic:pOGDV8nhIsEDLuLjgJsy@localhost:9200/'
});

export default client; 