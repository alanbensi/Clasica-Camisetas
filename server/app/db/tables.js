// queries to create db tables

const Sequelize = require('sequelize');
const sequelize = require('../config/db_config');

const queries = [
    {
        table: 'users', 
        layout: `id INT PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(100) UNIQUE NOT NULL,
                name VARCHAR(255) NOT NULL,
                surname VARCHAR(255) NOT NULL,
                fullname VARCHAR(255) NOT NULL, 
                email VARCHAR(255) UNIQUE NOT NULL, 
                password VARCHAR(100) NOT NULL,
                phone VARCHAR(50) NOT NULL,
                admin BOOLEAN NOT NULL,
                status BOOLEAN NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP`
    },
    {
        table: 'products',
        layout: `id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) UNIQUE NOT NULL,
                year INT,
                discount INT NOT NULL,
                price DECIMAL(12, 2) NOT NULL,
                price_usd DECIMAL(12, 2) NOT NULL,
                stock INT NOT NULL,
                collection VARCHAR(50),
                description TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP`
    },
    {
        table:'orders',
        layout: `id INT PRIMARY KEY AUTO_INCREMENT, 
                user_id INT NOT NULL, 
                total DECIMAL(12, 2) NOT NULL,
                total_usd DECIMAL(12, 2) NOT NULL,
                order_status VARCHAR(100), 
                payment VARCHAR(10),
                payment_status VARCHAR(100),
                tracking_code VARCHAR(50),
                address VARCHAR(255) NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP`
    },
    {
        table:'order_items',
        layout: `id INT PRIMARY KEY AUTO_INCREMENT,
                order_id INT NOT NULL, 
                product_id INT NOT NULL,
                quantity INT NOT NULL,
                price DECIMAL(12, 2) NOT NULL,
                price_usd DECIMAL(12, 2) NOT NULL,
                discount INT NOT NULL`
    },
    {
        table: 'auctions',
        layout: `id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                auction_status VARCHAR(100),
                open_value DECIMAL(12, 2) NOT NULL,
                description TEXT,
                start_date DATETIME,
                end_date DATETIME,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP`
    },
    {
        table: 'bids',
        layout: `bid_id INT PRIMARY KEY AUTO_INCREMENT,
                auction_id INT NOT NULL,
                user_id INT NOT NULL,
                bid_value DECIMAL(12, 2) NOT NULL,
                auto_bid BOOLEAN NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP`
    },
    {
        table: 'images',
        layout: `id INT PRIMARY KEY AUTO_INCREMENT,
                image_link VARCHAR(1000) NOT NULL`
    },
    {
        table: 'products_images',
        layout: `id INT PRIMARY KEY AUTO_INCREMENT,
                product_id INT NOT NULL,
                image_id INT NOT NULL`
    }
]
// Create database tables
// loops the array with the query for each table 
queries.forEach(query => {
    sequelize.query(`CREATE TABLE ${query.table} (${query.layout})`, 
        {raw: true}
    ).then(() => {
        console.log(`Table ${query.table} created`);
    }).catch((err) => {
        console.log(err);
    })
})

