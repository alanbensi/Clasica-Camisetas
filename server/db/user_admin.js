const Sequelize = require('sequelize');
const sequelize = require('../server.js');

// Creates Admin user 1
sequelize.query('INSERT INTO users (username, fullname, email, password, address, phone, admin) VALUES (?, ?, ?, ?, ?, ?, ?)',
    {replacements: ['SuperAdmin', 'Super Admin', 'superadmin@gmail.com', 'clasica123', 'calle falsa 123', '11111111', true]}
).then((response) => {
    console.log("SuperAdmin user created succesfully");
}).catch((err) => {
    console.log(err);
});

// Creates Admin user 2
sequelize.query('INSERT INTO users (username, fullname, email, password, address, phone, admin) VALUES (?, ?, ?, ?, ?, ?, ?)',
    {replacements: ['SuperAdmin2', 'Super Admin', 'superadmin2@gmail.com', 'clasica123', 'calle falsa 123', '11111111', true]}
).then((response) => {
    console.log("SuperAdmin2 user created succesfully");
}).catch((err) => {
    console.log(err);
});