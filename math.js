const express = require('express');
var cors = require('cors');
const http = require('http')
const bodyParser = require('body-parser');

/** get the base path, then add it as a global variable. */
global.__basedir = require('path').resolve('./');

/** parse the dot env and get the port */
require('dotenv').config({ path: __basedir + '/env/.env' })

// a request validator for the payload
const RequestValidator = require(__basedir + "/app/middleware/RequestValidator");

const SearchService = require(__basedir + '/app/service/SearchService');

const { PORT, ALLOWED_ORIGIN } = process.env;
// var allowed_origin = ALLOWED_ORIGIN;

const app = express();

/**parse requests of content-type - application/x-www-form-urlencoded*/
app.use(bodyParser.urlencoded({ extended: true }))

/**parse requests of content-type - application/json*/
app.use(bodyParser.json())

/** serving public file , the cookie parser and show the bot page */
app.use(express.static('frontend'));

const corsOptions = {
    origin: ALLOWED_ORIGIN,
    credentials: true
}

// enabling the cors
app.options(cors(corsOptions));
app.use(cors(corsOptions));

// root url and render the frontend 
app.get('/', (req, res) => {
    res.render('index');
});


//the search endpoints that hits the SearchService
app.post('/search', RequestValidator.search, (req, res) => {
    return SearchService.search(req, res);
});

/** catch all routes that are not defined and send response */
app.get('*', (req, res) => {
    res.status(404).json({
        "status": "error",
        "message": "Not Found",
        "data": null
    });
});

/* Connect express app */
const server = http.createServer(app)

/**listen for requests */
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

module.exports = server