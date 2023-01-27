// Added dependencies
const express = require('express');
const bodyParser = require('body-parser');
// eslint-disable-next-line no-unused-vars
const mysql2 = require('mysql2');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// Signing key for jsonwebtoken
const jwtKey = '123456';

const app = express();

app.use(cors());
// Applies body parser to all paths
app.use(bodyParser.json());

module.exports = {
    express: express,
    bodyParser: bodyParser,
    jwt: jwt,
    jwtKey: jwtKey,
    cors: cors,
    app: app
}
