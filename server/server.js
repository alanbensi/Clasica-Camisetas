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
        if (!(req.headers.authorization)) { throw new Error ('Token no encontrado. Se necesitan permisos.') }
        // extracts the token from the header
        const token = req.headers.authorization.split(' ')[1];
        // verifies the token with the sign chose 
        const decodeToken = jwt.verify(token, jwtKey);
        // checks if the user is admin
        // when it is, allows the request to keep going
        if(decodeToken && decodeToken.admin === 1) { return next(); }
        else{ throw new Error ('Acceso denegado.') }
    } catch(err){
        res.status(403).json({ error: err.message });
    }
}

// Validates user session
// eslint-disable-next-line no-unused-vars
function validateUser (req, res, next){
    try {
        // if the token is not sent in the header, throws an error
        if (!(req.headers.authorization)) { throw new Error ('Token no encontrado. Se necesitan permisos.') }
        // extracts the token from the header
        let token = req.headers.authorization.split(' ')[1];
        // verifies the token with the sign chose 
        const decodeToken = jwt.verify(token, jwtKey);
        if(decodeToken){
            // sends the data contained in the token
            req.tokenData = decodeToken;
            next();
        }else{
            throw new Error ('No ha iniciado sesión.');
        }
    } catch (err) {
        res.status(401).json({ error: err })
    }
}


// USER Endpoints

//  Login user
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    // checks if there´s a missing value, returns an error if there is
    if (!password || (!email && !password)){
        res.status(400);
        res.json({ error: `Faltan campos obligatorios.` });
        return;
    }
    // searches all user information
    sequelize.query('SELECT * FROM users WHERE email = ? AND status = ?',
        {replacements: [email, true], type: sequelize.QueryTypes.SELECT }
    ).then((response) => {
        if (response.length === 0) {
            throw new Error ('Inicio de sesión fallido: Usuario no encontrado.');
        }
        //checks if the found info and the submitted are the same
        //when they are, responds a token with the user id, username and admin info gotten from the select query
        if (response[0].password === password) {
            let payload = {
                id: response[0].id,
                email: response[0].email,
                admin: response[0].admin,
                username: response[0].username
            }
            res.status(200);
            // produces the token with jwt
            const token = jwt.sign(payload, jwtKey);
            // responds the token formed
            res.json({ token });
        } else {
            throw new Error ('Inicio de sesión fallido: Email o contraseña incorrectos.');
        }
    }).catch (function (err) {
        res.status(401).json({ error: err.message });
    });
});

//  Create user
//  Admin is false in every insert 
app.post('/users', (req, res) => {
    const { username, name, surname, email, password, phone } = req.body;
    // checks if there´s a missing value, returns an error if there is
    if (!username || !name || !surname || !email || !password || !phone){
        res.status(400);
        res.json({error: `Faltan campos obligatorios.`})
        return;
    }
    //checks that the same email isn´t already save
    sequelize.query('SELECT username, email FROM users WHERE username = ? OR email = ?',
        {replacements: [username, email], type: sequelize.QueryTypes.SELECT, raw: true }
    ).then((response) => {
        if (response.length !== 0) {
            throw new Error ('Email o nombre de usuario ya en uso.') 
        }
        // creates the user in db with the values sent in the body of the request
        // admin is always false
        const fullname = `${name} ${surname}`
        sequelize.query('INSERT INTO users (username, name, surname, fullname, email, password, phone, status, admin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            {replacements: [username, name, surname, fullname, email, password, phone, true, false]})
        .then((response) => {
            res.status(201).json({
                message: `El usuario fue creado exitosamente.`,
                user: {username, fullname, email, phone
            }});
        })
    }).catch (function (err) {
        res.status(409).json({ error: err.message});
    }); 
});

//  Get users
app.get('/users', validateUser, (req, res) => {
    const { id, admin } = req.tokenData;
    // if the user making the request is an admin it can get all users, user by id or email
    if (admin === 1) {
        // gets from query the value to search by
        const searchBy = Object.keys(req.query)[0];
        if (searchBy) {
            // searches user by the query param sent
            sequelize.query(`SELECT * FROM users WHERE ${searchBy} = ? AND status = ?`,
                {replacements: [req.query[searchBy], true], type: sequelize.QueryTypes.SELECT, raw: true}
            ).then(([response]) => {
                if (response) {
                    // when user exists, sends formatted user
                    const { id, username, name, surname, fullname, email, phone, created_at } = response;
                    const user = {
                        id,
                        username,
                        name,
                        surname,
                        fullname,
                        email,
                        phone,
                        created_at
                    }
                    res.status(200).send(user);
                } else {
                    // when the user is not found, throws error
                    throw new Error (`Usuario con ${searchBy}: ${req.query[searchBy]} no pudo ser encontrado.`);
                }
            }).catch(function (err){
                res.status(404);
                res.json({ error: err.message });
            });
        } 
        // when there is no search by term it gets all users
        else {
            sequelize.query('SELECT * FROM users WHERE status = ?',
                { replacements: [true], type: sequelize.QueryTypes.SELECT }
            ).then((response) => {
                let allUsers = response.map((user) => {
                    const { id, username, name, surname, fullname, email, phone, created_at } = user;
                    return {
                        id,
                        username,
                        name,
                        surname,
                        fullname,
                        email,
                        phone,
                        created_at
                    }
                });
                res.status(200).json(allUsers);
            })
        }
    } 
    // when the user making the request is non admin, gets that user info by id in token
    else if (admin === 0) {
        // searches user by id and active status
        sequelize.query(`SELECT * FROM users WHERE id = ? AND status = ?`,
            {replacements: [id, true], type: sequelize.QueryTypes.SELECT, raw: true}
        ).then(([response]) => {
            if (response) {
                // when user exists, sends response
                const { id, username, name, surname, fullname, email, phone, created_at } = response;
                const user = {
                    id,
                    username,
                    name,
                    surname,
                    fullname,
                    email,
                    phone,
                    created_at
                }
                res.status(200).send(user);
            } else {
                // when the user is not found, throws error
                throw new Error (`Usuario con Id ${id} no pudo ser encontrado.`);
            }
        }).catch(function (err){
            res.status(404);
            res.json({ error: err.message });
        });
    }
});

// Check existing email
app.get('/users/checkEmail', (req, res) => {
    const email = req.query.email;
    // checks if there´s a missing value, returns an error if there is
    if (!email){
        res.status(400);
        res.json({error: 'Este campo es obligatorio.'})
        return;
    }
    //checks that the email isn´t already in use
    sequelize.query(`SELECT email FROM users WHERE email = ? AND status = ?`,
        {replacements: [email, true], type: sequelize.QueryTypes.SELECT, raw: true }
    ).then((response) => {
        // Matching email
        if (response.length !== 0) {
            throw new Error ('Email ya en uso.') 
        } else {
            // No matching, response with no content
            res.status(204).json();
        }
    }).catch (function (err) {
        res.status(409).json({ error: err.message });
    });
});

//  Edit user
app.put('/users/:id', validateUser, (req, res) => {
    const id = req.params.id;
    const { name, surname, password, phone } = req.body;
    if (!name || !surname || !phone){
        // if nothing was sent in the body of the request, returns an error
        res.status(400).json({error: 'Faltan valores requeridos.'});
        return;
    }
    // checks the existence of an active user by the id sent
    sequelize.query('SELECT * FROM users WHERE id = ? AND status = ?',
        {replacements: [id, true], type: sequelize.QueryTypes.SELECT, raw: true }
    ).then((response) =>{
        // if the user doesn´t exists or is inactive, returns an error
        if (response.length == 0){
            res.status(404);
            throw new Error (`El usuario con Id ${id} no pudo ser encontrado.`);
        }
        // when the product by id is found and the product name is not in other product, makes the edition
        const fullname = `${name} ${surname}`;
        let setQuery = password ? 
            `SET name = "${name}", surname = "${surname}", fullname = "${fullname}", password = "${password}", phone = ${phone}` :
            `SET name = "${name}", surname = "${surname}", fullname = "${fullname}", phone = ${phone}`;
        sequelize.query(`UPDATE users 
            ${setQuery}
            WHERE id = ?`,
            { replacements: [id] }
        ).then((response) => {
            res.status(200).send('Usuario editado exitosamente.')
        });
    }).catch(function(err){
        res.json({error: err.message});
    })
});

//  Inactive user
app.put('/users/inactive/:id', validateUser, (req, res) => {
    const id = req.params.id;
    // checks the existence of an active user by the id sent
    sequelize.query('SELECT * FROM users WHERE id = ? AND status = ?',
        {replacements: [id, true], type: sequelize.QueryTypes.SELECT, raw: true }
    ).then((response) =>{
        // if the user doesn´t exists or is inactive, returns an error
        if (response.length == 0){
            res.status(404);
            throw new Error (`El usuario con Id ${id} no pudo ser encontrado.`);
        }
        // when the product by id is found and the product name is not in other product, makes the edition
        sequelize.query(
            `UPDATE users 
            SET status = false 
            WHERE id = ?`, 
            {replacements: [id]}
        ).then((response) => {
            res.status(200).send('Usuario desactivado exitosamente.')
        });
    }).catch(function(err){
        res.json({error: err.message});
    })
});

// PRODUCTS Endpoints

//  Create product
app.post('/products', adminAuth, (req, res) => {
    const { name, images, discount, price, price_usd, stock, collection, description } = req.body;
    // checks if there´s a missing value, returns an error if there is
    if (!name || !price || !price_usd || !discount || !stock) {
        res.status(400);
        res.json({ error: 'Faltan campos obligatorios.' })
        return;
    }
    //searches product by the product name sent in the request
    sequelize.query('SELECT name FROM products WHERE name = ?',
        {replacements: [name], type: sequelize.QueryTypes.SELECT, raw: true }
    ).then((response) => {
        //checks for the content of response
        //if response is not empty means a product by the product name is already saved
        if (response.length != 0) { 
            throw new Error (`El producto ${name} ya existe.`) 
        }
        //creates the product in db with the values sent in the body of the request
        sequelize.query('INSERT INTO products (name, images, discount, price, price_usd, stock, collection, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            {replacements: [name, images, discount, price, price_usd, stock, collection, description]})
        .then((response) => {
            res.status(201).json({ 
                message: `Producto ${name} creado exitosamente.`,
                product: {
                    id: response[0],
                    name: name,
                    images: images,
                    discount: discount,
                    price: price,
                    price_usd: price_usd,
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
app.get('/products', (req, res) => {
    sequelize.query('SELECT * FROM products WHERE stock > ?',
        { replacements: [0], type: sequelize.QueryTypes.SELECT }
    ).then((response) => {
        res.status(200).json(response);
    });
});

//  Get product by id
app.get('/products/:id', (req, res) => {
    //extracts id param from req
    let id = req.params.id;
    //search by the id sent in the request
    sequelize.query('SELECT * FROM products WHERE id = ?',
        {replacements: [id], type: sequelize.QueryTypes.SELECT, raw: true }
    ).then((response) => {
        //checks if the product by id sent in the request exists
        if (response.length == 0) { 
            throw new Error (`El producto con Id ${id} no pudo ser encontrado.`);
        }
        //when the product exists answers the one that was found
        res.status(200).json(response);
    }).catch (function (err) {
        res.status(404).json({ error: err.message });
    });
});

// Get products by collection
app.get('/products/collections/:collection', (req, res) => {
    //extracts collection param from req
    let collection = req.params.collection;
    //search by the collection sent in the request
    sequelize.query('SELECT * FROM products WHERE collection = ? AND stock > ?',
        {replacements: [collection, 0], type: sequelize.QueryTypes.SELECT, raw: true }
    ).then((response) => {
        //checks if there are any product by collection sent in req
        if (response.length == 0) { 
            throw new Error (`Productos de la colección ${collection} no pudieron ser encontrados.`);
        }
        //when products by collection exist, returns the found ones
        res.status(200).json(response);
    }).catch (function (err) {
        res.status(404).json({ error: err.message });
    });
});

// Get products with discount
app.get('/productsWithDiscount', (req, res) => {
    //search products with any discount
    sequelize.query('SELECT * FROM products WHERE discount > ? AND stock > ?',
        {replacements: [0, 0], type: sequelize.QueryTypes.SELECT, raw: true }
    ).then((response) => {
        //checks if there are any product with discount
        if (response.length === 0) { 
            throw new Error (`No se encontraron productos con descuento.`);
        }
        //when products with discount exist, returns the found ones
        res.status(200).json(response);
    }).catch (function (err) {
        res.status(404).json({ error: err.message });
    });
});

//  Edit product
app.put('/products/:id', adminAuth, (req, res) => {
    let id = req.params.id;
    const { name, images, discount, price, price_usd, stock, collection, description } = req.body;
    if (!name || !images || !price || !price_usd || !discount || !stock || !collection || !description){
        // if nothing was sent in the body of the request, returns an error
        res.status(400).json({error: 'Faltan valores requeridos.'});
        return;
    }
    // checks the existence of the product by the id sent
    sequelize.query('SELECT * FROM products WHERE id = ?',
        {replacements: [id], type: sequelize.QueryTypes.SELECT, raw: true }
    ).then((response) =>{
        // if the product doesn´t exists, returns an error
        if (response.length == 0){
            res.status(404);
            throw new Error (`El producto con Id ${id} no pudo ser encontrado.`);
        }
        // checks the existence of a product by the product name sent
        sequelize.query('SELECT * FROM products WHERE name = ?',
            {replacements: [name], type: sequelize.QueryTypes.SELECT, raw: true }
        ).then((response) =>{
            // if product name exists in other product, returns error
            if (response.length && response[0].id != id){
                res.status(409);
                throw new Error (`Un producto con ese nombre ya existe.`);
            }
            // when the product by id is found and the product name is not in other product, makes the edition
            sequelize.query(
                `UPDATE products 
                SET name = "${name}", images = "${images}", discount = "${discount}", price = "${price}", price_usd = "${price_usd}", stock = "${stock}", collection = "${collection}", description = "${description}" 
                WHERE id = ?`, 
                {replacements: [id]}
            ).then((response) => {
                res.status(200).send('Producto editado exitosamente.')
            });
        }).catch(function(err){
            res.json({error: err.message});
        });
    }).catch(function(err){
        res.json({error: err.message});
    })
});

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
            throw new Error (`El producto con Id ${id} no pudo ser encontrado.`);
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

// ORDERS Endpoints

//  Create Order
app.post('/orders', validateUser, (req, res) => {
    const { id } = req.tokenData
    const { order, order_items } = req.body;
    // checks if the user with the id sent in the order exists
    sequelize.query('SELECT id FROM users WHERE id = ? AND status = ?',
        {replacements: [id, true], type: sequelize.QueryTypes.SELECT, raw: true}
    ).then(async function (response) {
        try {
            // if there´s no user with the id sent, throws a not found error
            if (response.length == 0) {
                res.status(404)
                throw new Error (`El usuario con Id ${id} no pudo ser encontrado.`);
            }
            // when the user exists 
            await Promise.all(order_items.map(async (item, i) => {
                // gets the price, price in usd, discount and stock of every item of the products table sent in order_items
                const [itemData] = await sequelize.query('SELECT price, price_usd, discount, stock FROM products WHERE id = ?',
                { replacements: [item.product_id], type: sequelize.QueryTypes.SELECT, raw: true });
                // if any of the products by id can't be found throws an error
                if (!itemData){
                    res.status(404)
                    throw new Error (`El producto con Id ${item.product_id} no pudo ser encontrado.`);
                }
                // reduces stock by quantity ordered
                let newStock = itemData.stock - item.quantity;
                sequelize.query(`UPDATE products SET stock = "${newStock}" WHERE id = ?`, { replacements: [item.product_id] });
                // adds remaining data to order_items array
                order_items[i] = {
                    ...order_items[i],
                    price: itemData.price,
                    price_usd: itemData.price_usd,
                    discount: itemData.discount
                }
            }))
            // after the price of the whole order is obtained, creates the order
            sequelize.query('INSERT INTO orders (user_id, total, total_usd, order_status, payment, payment_status, address) VALUES (?, ?, ?, ?, ?, ?, ?)',
                {replacements: [id, order.total, order.totalUsd, "Nuevo", order.payment, "Pendiente", order.address]}
            ).then((response) => {
                // creates a register for every ordered item
                order_items.forEach(item => {
                    sequelize.query('INSERT INTO order_items (order_id, product_id, quantity, price, price_usd, discount) VALUES (?, ?, ?, ?, ?, ?)',
                    {replacements: [response[0], item.product_id, item.quantity, item.price, item.price_usd, item.discount]}); 
                });
                res.status(201).json({message: "La orden fue creada con éxito"});
            });
        } catch (err) {
            res.json({ error: err.message });
        }
    }); 
});

//  Get all orders or orders by any user id for admin or all orders for logged user id
app.get('/orders', validateUser, (req, res) => {
    const { id, admin } = req.tokenData;
    const { userId } = req.body;
    // user id to search by depending on whether the logged user is an admin or not
    const idToUse = admin === 1 ? userId : id;
    // when the user logged in is an admin and an user id was not sent in body, returns all orders
    if (admin === 1 && userId == null) {
        sequelize.query('SELECT orders.*, users.fullname FROM orders JOIN users ON orders.user_id = users.id JOIN order_items ON orders.id = order_items.order_id JOIN products ON order_items.product_id = products.id GROUP BY orders.id',
            {type: sequelize.QueryTypes.SELECT, raw: true}
        ).then(async function(response) {
            try {
                if (response.length === 0){
                    res.status(404)
                    throw new Error (`No se ha encontrado ningún pedido.`);
                }
                const ordersWithItems = [];
                await Promise.all(response.map(async function(order){
                    await sequelize.query(`SELECT order_items.*, products.name, products.images
                        FROM order_items JOIN products ON order_items.product_id = products.id WHERE order_id = ? GROUP BY order_items.id`,
                        {replacements: [order.id], type: sequelize.QueryTypes.SELECT, raw: true }
                    ).then((res) => {
                        ordersWithItems.push({
                            ...order,
                            items: res
                        });
                    })
                }))
                res.status(200).json(ordersWithItems);
            } catch (err) {
                res.status(404).json({ error: err.message });
            }
        })
    } 
    // when the user logged in is not an admin, returns all orders made by that user
    // and when the user logged in is an admin and an user id was sent in body, returns all orders by sent id
    else {
        sequelize.query('SELECT orders.*, users.fullname FROM orders JOIN users ON orders.user_id = users.id JOIN order_items ON orders.id = order_items.order_id JOIN products ON order_items.product_id = products.id WHERE orders.user_id = ? GROUP BY orders.id',
            {replacements: [idToUse], type: sequelize.QueryTypes.SELECT, raw: true}
        ).then(async function(response) {
            try {
                if (response.length === 0){
                    res.status(404)
                    throw new Error (`El usuario no ha hecho ningún pedido.`);
                }
                const ordersWithItems = [];
                await Promise.all(response.map(async function(order){
                    await sequelize.query(`SELECT order_items.*, products.name, products.images
                        FROM order_items JOIN products ON order_items.product_id = products.id WHERE order_id = ? GROUP BY order_items.id`,
                        {replacements: [order.id], type: sequelize.QueryTypes.SELECT, raw: true }
                    ).then((res) => {
                        ordersWithItems.push({
                            ...order,
                            items: res
                        });
                    })
                }))
                res.status(200).json(ordersWithItems);
            } catch (err) {
                res.status(404).json({ error: err.message });
            }
        })
    }
});

//  Get order by id 
app.get('/orders/:id', adminAuth, (req, res) => {
    const id = req.params.id;
    // searches order by the id sent in path
    sequelize.query('SELECT orders.*, users.fullname FROM orders JOIN users ON orders.user_id = users.id JOIN order_items ON orders.id = order_items.order_id JOIN products ON order_items.product_id = products.id  WHERE orders.id = ?',
        {replacements: [id], type: sequelize.QueryTypes.SELECT, raw: true}
    ).then(([response]) => {
        let orderData = response;
        // if the order id can´t be found, throws error
        if(!(response.id)){
            res.status(404);
            throw new Error (`La orden con Id ${id} no pudo ser encontrada.`);
        }
        // when order exists, get order items
        sequelize.query(`SELECT order_items.*, products.name, products.images
            FROM order_items JOIN products ON order_items.product_id = products.id WHERE order_id = ? GROUP BY order_items.id`,
            {replacements: [id], type: sequelize.QueryTypes.SELECT, raw: true }
        ).then((response) => {
            orderData = {
                ...orderData,
                items: response
            }
            // sends formatted response
            res.status(200).json(orderData);
        })
    }).catch(function (err){
        res.json({ error: err.message});
    });
});

//  Edit status of the order by order id
app.put('/orders/:id', adminAuth, (req, res) => {
    const id = req.params.id;
    const { order_status, payment, payment_status, address } = req.body;
    if (!order_status || !payment || !payment_status || !address ){
        // if nothing was sent in the body of the request, returns an error
        res.status(400).json({error: `Faltan campos obligatorios.`});
        return;
    }
    // checks the existence of the order by the id sent
    sequelize.query('SELECT * FROM orders WHERE id = ?',
        {replacements: [id], type: sequelize.QueryTypes.SELECT, raw: true }
    ).then((response) =>{
        // if the order doesn´t exists, returns an error
        if (response.length == 0){
            res.status(404);
            throw new Error (`La orden con Id ${id} no pudo ser encontrada.`);
        }
        // when the order by id is found, makes the edition
        sequelize.query(
            `UPDATE orders 
            SET order_status = "${order_status}", payment = "${payment}", payment_status = "${payment_status}", address = "${address}" 
            WHERE id = ?`, 
            {replacements: [id]}
        ).then((response) => { 
            res.status(200).send('La orden fue editada exitosamente.');
        });
        // if order status was changed to cancelled, product stock returns to original state
    }).catch(function(err){
        res.json({error: err.message});
    })
});

//  Delete order
app.delete('/orders/:id', adminAuth, (req, res) => {
    const id = req.params.id;
    // checks if the order by id exists
    sequelize.query('SELECT * FROM orders WHERE id = ?',
        {replacements: [id], type: sequelize.QueryTypes.SELECT, raw: true }
    ).then((response) =>{
        // if the order by id doesn´t exist, throws an error
        if (response.length == 0){
            res.status(404)
            throw new Error (`La orden con Id ${id} no pudo ser encontrada.`);
        }
        // when the order by id exits, gets deleted
        sequelize.query('DELETE orders, order_items FROM orders JOIN order_items ON order_items.order_id = orders.id WHERE id = ?',
            {replacements: [id]}
        ).then((response) => {
            res.status(204).json();
        });
    }).catch(function(err){
        res.json({error: err.message});
    });
});

// ALL Endpoint

// Get ALL User info, Orders and Auctions by User Id
app.get('/all', validateUser, (req, res) => {
    const { id, admin } = req.tokenData;
    const { userId } = req.body;
    const idToUse = admin === 1 && userId ? userId : id;
    // searches user by id and active status
    sequelize.query(`SELECT * FROM users WHERE id = ? AND status = ?`,
        {replacements: [idToUse, true], type: sequelize.QueryTypes.SELECT, raw: true}
    ).then(([response]) => {
        let userInfo = {};
        if (response) {
            // when user exists, sends response
            const { id, username, name, surname, fullname, email, phone, created_at } = response;
            userInfo = {
                user: {
                    id,
                    username,
                    name,
                    surname,
                    fullname,
                    email,
                    phone,
                    created_at
                }
            }
            // searches orders by user id
            sequelize.query('SELECT * FROM orders WHERE user_id = ?',
                {replacements: [idToUse], type: sequelize.QueryTypes.SELECT, raw: true}
            ).then(async function(response) {
                try {
                    const ordersWithItems = [];
                    await Promise.all(response.map(async function(order){
                        await sequelize.query(`SELECT order_items.*, products.name, products.images
                            FROM order_items JOIN products ON order_items.product_id = products.id WHERE order_id = ? GROUP BY order_items.id`,
                            {replacements: [order.id], type: sequelize.QueryTypes.SELECT, raw: true }
                        ).then((res) => {
                            ordersWithItems.push({
                                ...order,
                                items: res
                            });
                        })
                    }))
                    userInfo = {
                        ...userInfo,
                        orders: ordersWithItems,
                    }
                    res.status(200).send(userInfo);
                } catch (err) {
                    res.json({ error: err.message });
                }
            })
        } else {
            // when the user is not found, throws error
            throw new Error (`Usuario con Id ${idToUse} no pudo ser encontrado.`);
        }
    }).catch(function (err){
        res.status(404).json({ error: err.message });
    });
});

// Indicates the server is working
app.listen(3001, () => {
    console.log('Server running...');
});

