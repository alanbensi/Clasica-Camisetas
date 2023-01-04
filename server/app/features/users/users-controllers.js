const sequelize = require("../../config/db_config");
const { jwt, jwtKey } = require("../../config/config");

//  Login user

exports.login = (req, res) => {
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
}

//  Create user
//  Admin is false in every insert 

exports.addUser = (req, res) => {
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
}

//  Get users

exports.getAll = (req, res) => {
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
}

// Check existing email

exports.checkEmail = (req, res) => {
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
}

//  Edit user

exports.editUser = (req, res) => {
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
}

//  Inactive user

exports.inactiveUser = (req, res) => {
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
}