// ----- Begin your project below! -----
const express       = require('express');
const {graphqlHTTP} = require('express-graphql');
const sassMiddleware = require('node-sass-middleware');

// Split these out for better testability and cleaner index.js
const schema = require('./graphql/schema.js');
const root   = require('./graphql/root.js');
const app = express();

const basePath = '/addressBook'; // Needs to be in .env
const apiPath = `${basePath}/api`;
const port = 4000;


app.use(apiPath, graphqlHTTP({
    schema   : schema,
    rootValue: root,
    graphiql : true,
}));

app.use(sassMiddleware({
    src: `${__dirname}/public/css`,
    dest: `${__dirname}/public/css`,
    debug: false,
    outputStyle: 'compressed',
    prefix:  `${basePath}/css`,
}))

app.use(`${basePath}/tabulator`, express.static(`${__dirname}/node_modules/tabulator-tables/dist`))

app.use(basePath, express.static(`${__dirname}/public`));

//This catchall route must be last
app.get(`${basePath}/*`, (req,res, next) => {
    res.redirect(`${__dirname}/public/index.html`)
})

let server = app.listen(port, () => console.log(`http://localhost:${port}${apiPath}`));

module.exports = {
    server,
    apiPath
};