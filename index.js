// ----- Begin your project below! -----
const express       = require('express');
const {graphqlHTTP} = require('express-graphql');

// Split these out for better testability and cleaner index.js
const schema = require('./schema.js');
const root   = require('./root.js');

const app = express();
const apiPath = '/api';
const port = 4000;
app.use(apiPath, graphqlHTTP({
    schema   : schema,
    rootValue: root,
    graphiql : true,
}));
let server = app.listen(port, () => console.log(`http://localhost:${port}${apiPath}`));

module.exports = server;