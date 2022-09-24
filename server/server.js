// Added dependencies
const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
// eslint-disable-next-line no-unused-vars
const mysql2 = require('mysql2');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// Signing key for jsonwebtoken
const jwtKey = '123456';

const app = express();

app.use(cors())

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
// eslint-disable-next-line no-unused-vars
function validateUser (req, res, next){
    try {
        // if the token is not sent in the header, throws an error
        if (!(req.headers.authorization)) { throw new Error ('Missing token. Need permissions') }
        // extracts the token from the header
        let token = req.headers.authorization.split(' ')[1];
        // verifies the token with the sign chose 
        const decodeToken = jwt.verify(token, jwtKey);
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
        res.json({ error: `Missing obligatory fields` });
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
        if (response[0].password === password) {
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
            throw new Error ();
        }
    }).catch (() => {
        res.status(401).json({ error: 'Login failed: Incorrect username, email or password' });
    });
});

//  Create user
//  Admin is false in every insert 
app.post('/users', (req, res) => {
    const { username, name, surname, email, password, address, phone } = req.body;
    // checks if there´s a missing value, returns an error if there is
    if (!username || !name || !surname || !email || !password || !address || !phone){
        res.status(400);
        res.json({error: `Missing obligatory fields`})
        return;
    }
    //checks that the same username or email isn´t already save
    sequelize.query('SELECT username, email FROM users WHERE username = ? OR email = ?',
        {replacements: [username, email], type: sequelize.QueryTypes.SELECT, raw: true }
    ).then((response) => {
        if (response.length !== 0) {
            throw new Error ('Username or email already exist') 
        }
        // creates the user in db with the values sent in the body of the request
        // admin is always false
        const fullname = `${name} ${surname}`
        sequelize.query('INSERT INTO users (username, name, surname, fullname, email, password, address, phone, admin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            {replacements: [username, name, surname, fullname, email, password, address, phone, false]})
        .then((response) => {
            res.status(201).json({ message: `User ${username} created successfully`,
                user: {username: username, fullname: fullname, email: email, address: address, phone: phone}});
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
            if (response) {
                // when user exists, sends response
                res.status(200).send(response);
            } else {
                // when the user is not found, throws error
                throw new Error (`User with ${searchBy} = ${req.query[searchBy]} could not be found`);
            }
        }).catch(function (err){
            res.status(404);
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

// Check existing email
app.get('/users/checkEmail', (req, res) => {
    const email = req.query.email;
    // checks if there´s a missing value, returns an error if there is
    if (!email){
        res.status(400);
        res.json({error: 'Este campo es obligatorio'})
        return;
    }
    //checks that the email isn´t already in use
    sequelize.query(`SELECT email FROM users WHERE email = ?`,
        {replacements: [email], type: sequelize.QueryTypes.SELECT, raw: true }
    ).then((response) => {
        // Matching username or email
        if (response.length !== 0) {
            throw new Error ('Email ya en uso') 
        } else {
            // No matching, response with no content
            res.status(204).json();
        }
    }).catch (function (err) {
        res.status(409).json({ error: err.message });
    });
});

// PRODUCTS Endpoints

//  Create product
app.post('/products', adminAuth, (req, res) => {
    const { name, images, discount, price, stock, collection, description } = req.body;
    // checks if there´s a missing value, returns an error if there is
    if (!name || !price || !discount || !stock) {
        res.status(400);
        res.json({ error: 'Missing obligatory fields' })
        return;
    }
    //searches product by the product name sent in the request
    sequelize.query('SELECT name FROM products WHERE name = ?',
        {replacements: [name], type: sequelize.QueryTypes.SELECT, raw: true }
    ).then((response) => {
        //checks for the content of response
        //if response is not empty means a product by the product name is already saved
        if (response.length != 0) { 
            throw new Error ('Product already exist') 
        }
        //creates the product in db with the values sent in the body of the request
        sequelize.query('INSERT INTO products (name, images, discount, price, stock, collection, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
            {replacements: [name, images, discount, price, stock, collection, description]})
        .then(() => {
            res.status(201).json({ 
                message: `Product ${name} created successfully`,
                product: {
                    name: name,
                    images: images,
                    discount: discount,
                    price: price,
                    stock: stock,
                    collection: collection,
                    description: description
                }
            });
        });
    }).catch (function (err) {
        res.status(409).json({ error: err.message });
    });
});

//  Get all products
app.get('/products', validateUser, (req, res) => {
    sequelize.query('SELECT * FROM products',
        { type: sequelize.QueryTypes.SELECT }
    ).then((response) => {
        res.status(200).json(response);
    });
});

//  Get product by id
app.get('/products/:id', validateUser, (req, res) => {
    //extracts id param from req
    let id = req.params.id;
    //search by the id sent in the request
    sequelize.query('SELECT * FROM products WHERE id = ?',
        {replacements: [id], type: sequelize.QueryTypes.SELECT, raw: true }
    ).then((response) => {
        //checks if the product by id sent in the request exists
        if (response.length == 0) { 
            throw new Error (`Product ${id} couldn't be found`);
        }
        //when the product exists answers the one that was found
        res.status(200).json(response);
    }).catch (function (err) {
        res.status(404).json({ error: err.message });
    });
});

// Get products by collection
app.get('/products/collections/:collection', validateUser, (req, res) => {
    //extracts collection param from req
    let collection = req.params.collection;
    //search by the collection sent in the request
    sequelize.query('SELECT * FROM products WHERE collection = ?',
        {replacements: [collection], type: sequelize.QueryTypes.SELECT, raw: true }
    ).then((response) => {
        //checks if there are any product by collection sent in req
        if (response.length == 0) { 
            throw new Error (`Products of collection ${collection} couldn't be found`);
        }
        //when products by collection exist, returns the found ones
        res.status(200).json(response);
    }).catch (function (err) {
        res.status(404).json({ error: err.message });
    });
});

// Get products with discount
app.get('/products-with-discount', validateUser, (req, res) => {
    //search products with any discount
    sequelize.query('SELECT * FROM products WHERE discount > ?',
        {replacements: [0], type: sequelize.QueryTypes.SELECT, raw: true }
    ).then((response) => {
        //checks if there are any product with discount
        if (response.length === 0) { 
            throw new Error (`Products with discount couldn't be found`);
        }
        //when products with discount exist, returns the found ones
        res.status(200).json(response);
    }).catch (function (err) {
        res.status(404).json({ error: err.message });
    });
});

//  Edit product


//  Delete product
app.delete('/products/:id', adminAuth, (req, res) => {
    let id = req.params.id;
    // checks if the product by id exists
    sequelize.query('SELECT * FROM products WHERE id = ?',
        {replacements: [id], type: sequelize.QueryTypes.SELECT, raw: true }
    ).then((response) =>{
        // if the product by id doesn´t exist, throws an error
        if (response.length == 0){
            res.status(404)
            throw new Error (`Product with id = ${id} could not be found`);
        }
        // when the product by id exits, gets deleted
        sequelize.query('DELETE FROM products WHERE id = ?',
            {replacements: [id]}
        ).then((response) => {
            res.status(204).json();
        });
    }).catch(function(err){
        res.json({error: err.message});
    });
});

// Indicates the server is working
app.listen(3001, () => {
    console.log('Server running...');
});

