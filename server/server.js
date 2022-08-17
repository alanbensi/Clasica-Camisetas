// Added dependencies
const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const mysql2 = require('mysql2');
const jwt = require('jsonwebtoken');

// Signing key for jsonwebtoken
const jwtKey = '123456';

const app = express();

// Applies body parser to all paths
app.use(bodyParser.json());

// Import connection to database constants
const DB = require('./db/config');

// Connection to db             
const sequelize = new Sequelize(`${DB.DIALECT}://${DB.USER}:${DB.PASSWORD}@${DB.HOST}:${DB.PORT}/${DB.NAME}`);

sequelize.authenticate().then(() => {
    console.log('Connection established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

//export sequelize
module.exports = sequelize;

// Handles server errors
function handleError(err, req, res, next) {
    if (!err) { next(); }
    res.status(500).send('An error has occurred. ' + err);
    console.log(`Error: ${err} en ${req.path} ${req.method}`)
}
// Applies middleware to handle server error to all paths
app.use(handleError);

// Verifies if the user is an admin
function adminAuth (req, res, next){
    try {
        // if the token is not sent in the header, throws an error
        if (!(req.headers.authorization)) { throw new Error ('Missing token. Need permissions') }
        // extracts the token from the header
        const token = req.headers.authorization.split(' ')[1];
        // verifies the token with the sign chose 
        const decodeToken = jwt.verify(token, jwtKey);
        // checks if the user is admin
        // when it is, allows the request to keep going
        if(decodeToken && decodeToken.admin === 1) { return next(); }
        else{ throw new Error ('Access denied') }
    } catch(err){
        res.status(403).json({ error: err.message });
    }
}

// Validates user session
function validateUser (req, res, next){
    try {
        // if the token is not sent in the header, throws an error
        if (!(req.headers.authorization)) { throw new Error ('Missing token. Need permissions') }
        // extracts the token from the header
        let token = req.headers.authorization.split(' ')[1];
        // verifies the token with the sign chose 
        decodeToken = jwt.verify(token, jwtKey);
        if(decodeToken){
            // sends the data contained in the token
            req.tokenData = decodeToken;
            next();
        }else{
            throw new Error ('You are not logged in');
        }
    } catch (err) {
        res.status(401).json({ error: err })
    }
}


// USER Endpoints

//  Login user
app.post('/login', (req, res) => {
    const { username, email, password } = req.body;
    // checks if there´s a missing value, returns an error if there is
    if (!password || (!username && !password) || (!email && !password)){
        res.status(400);
        res.json({ error: 'Missing obligatory fields' });
        return;
    }
    // get the condition to search by
    const searchBy = username ? username : email;
    const querySearchBy = username ? 'SELECT * FROM users WHERE username = ?' : 'SELECT * FROM users WHERE email = ?';
    // searches all user information
    sequelize.query(querySearchBy,
        {replacements: [searchBy], type: sequelize.QueryTypes.SELECT }
    ).then((response) => {
        //checks if the found info and the submitted are the same
        //when they are, responds a token with the user id, username and admin info gotten from the select query
        if (response.length == 0){
            throw err;
        } 
        if (response[0].password == password) {
            let payload = {
                id: response[0].id,
                username: response[0].username,
                admin: response[0].admin
            }
            res.status(200);
            // produces the token with jwt
            const token = jwt.sign(payload, jwtKey);
            // responds the token formed
            res.json({ token });
        } else {
            throw err;
        }
    }).catch (function (err) {
        res.status(401).json({ error: 'Login failed: Incorrect username, email or password' });
    });
});

//  Create user
//  Admin is false in every insert 
app.post('/users', (req, res) => {
    const { username, name, surname, email, password, address } = req.body;
    // checks if there´s a missing value, returns an error if there is
    if (!username || !name || !surname || !email || !password || !address){
        res.status(400);
        res.json({error: `Missing obligatory fields`})
        return;
    }
    //checks that the same username or email isn´t already save
    sequelize.query('SELECT username, email FROM users WHERE username = ? OR email = ?',
        {replacements: [username, email], type: sequelize.QueryTypes.SELECT, raw: true }
    ).then((response) => {
        if (response.length != 0) {
            throw new Error ('Username or email already exist') 
        }
        // creates the user in db with the values sent in the body of the request
        // admin is always false
        const fullname = `${name} ${surname}`
        sequelize.query('INSERT INTO users (username, name, surname, fullname, email, password, address, admin) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            {replacements: [username, name, surname, fullname, email, password, address, false]})
        .then((response) => {
            res.status(201).json({ message: `User ${username} created successfully`,
                user: {username: username, fullname: fullname, email: email, address: address}});
        })
    }).catch (function (err) {
        res.status(409).json({ error: err.message});
    }); 
});

//  Gets users if the user making the request is an admin
// all users, user by id, username or email
app.get('/users', adminAuth, (req, res) => {
    const searchBy = Object.keys(req.query)[0];
    if (searchBy) {
        // searches user by the query param sent
        sequelize.query(`SELECT * FROM users WHERE ${searchBy} = ?`,
            {replacements: [req.query[searchBy]], type: sequelize.QueryTypes.SELECT, raw: true}
        ).then(([response]) => {
            console.log(response[searchBy]);
            // if the user can´t be found, throws error
            // if(!(response[searchBy])){
            //     res.status(404);
            //     throw new Error (`User with ${searchBy} = ${req.query[searchBy]} could not be found`);
            // }
            // when user exists, sends response
            res.status(200).send(response);
        }).catch(function (err){
            res.json({ error: err.message });
        });
    } else {
        sequelize.query('SELECT * FROM users',
            { type: sequelize.QueryTypes.SELECT }
        ).then((response) => {
            res.status(200).json(response);
        })
    }
});

// Check existing username or email
app.get('/users/checkUsernameOrEmail', (req, res) => {
    const searchBy = Object.keys(req.body)[0];
    console.log(req.body);
    // checks if there´s a missing value, returns an error if there is
    if (!searchBy){
        res.status(400);
        res.json({error: 'Username or email are required'})
        return;
    }
    //checks that the username or email isn´t already save
    sequelize.query(`SELECT ${searchBy} FROM users WHERE ${searchBy} = ?`,
        {replacements: [req.body[searchBy]], type: sequelize.QueryTypes.SELECT, raw: true }
    ).then((response) => {
        // Matching username or email
        if (response.length != 0) {
            throw new Error ('Username or email already exist') 
        } else {
            // No matching, response with no content
            res.status(204).json();
        }
    }).catch (function (err) {
        res.status(409).json({ error: err.message });
    }); 
});

// Indicates the server is working
app.listen(3000, () => {
    console.log('Server running...');
});

