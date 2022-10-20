const Sequelize = require('sequelize');
const sequelize = require('../server.js');

// Creates Admin user 1
sequelize.query('INSERT INTO users (name, surname, fullname, email, password, phone, status, admin) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    {replacements: ['Super', 'Admin', 'Super Admin', 'superadmin@gmail.com', 'clasica123', '11111111', true, true]}
).then((response) => {
    console.log("SuperAdmin user created succesfully");
}).catch((err) => {
    console.log(err);
});

// Creates Admin user 2
sequelize.query('INSERT INTO users (name, surname, fullname, email, password, phone, status, admin) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    {replacements: ['Super', 'Admin', 'Super Admin', 'superadmin2@gmail.com', 'clasica123', '11111111', true, true]}
).then((response) => {
    console.log("SuperAdmin2 user created succesfully");
}).catch((err) => {
    console.log(err);
});