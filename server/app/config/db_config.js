const Sequelize = require('sequelize');

// Import connection to database constants
const DB = require('./db_data');

// Connection to db             
const sequelize = new Sequelize(`${DB.DIALECT}://${DB.USER}:${DB.PASSWORD}@${DB.HOST}:${DB.PORT}/${DB.NAME}`);

sequelize.authenticate().then(() => {
    console.log('Connection established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

//export sequelize
module.exports = sequelize;