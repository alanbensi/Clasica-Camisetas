// queries to create products and order

const sequelize = require("../config/db_config");

// 3 users data
const users = [
    { username: "AlanB", name: "Alan", surname: "Bensi", fullname: "Alan Bensi", email: "user1@email.com", password: "pass1", phone: "1133435543" },
    { username: "SofiaC", name: "Sofia", surname: "Carena", fullname: "Sofia Carena", email: "user2@email.com", password: "pass2", phone: "1133435543" },
    { username: "JosefinaI", name: "Josefina", surname: "Iñurrategui", fullname: "Josefina Iñurrategui", email: "user3@email.com", password: "pass3", phone: "1133435543" }
]

// 4 products data
const products = [
    { name: "Camiseta Argentina 1990", images: "", discount: 0, price: 15000, price_usd: 50, stock: 10, collection: "Argentina", description: "Descripcion de Camiseta Argentina 1990" },
    { name: "Camiseta Argentina 1986", images: "", discount: 20, price: 30000, price_usd: 100, stock: 2, collection: "Argentina", description: "Descripcion de Camiseta Argentina 1986" },
    { name: "Camiseta Italia 1986", images: "", discount: 5, price: 15000, price_usd: 50, stock: 6, collection: "Italia", description: "Descripcion de Camiseta Italia 1986" },
    { name: "Camiseta Brasil 1994", images: "", discount: 0, price: 22500, price_usd: 75, stock: 5, collection: "Brasil", description: "Descripcion de Camiseta Brasil 1994" }
]

// 3 orders data
const orders = [
    { 
        order: { userId: 3, total: 54000, totalUsd: 180, payment: "Efectivo", address: "Calle Falsa 123" },
        orderItems: [
            { productId: 1, quantity: 2, price: 15000, price_usd: 50, discount: 0 },
            { productId: 2, quantity: 1, price: 30000, price_usd: 100, discount: 20 },
        ]
    },
    { 
        order: { userId: 3, total: 66750, totalUsd: 222.50, payment: "Transferencia bancaria", address: "Calle Falsa 123" },
        orderItems: [
            { productId: 1, quantity: 2, price: 15000, price_usd: 50, discount: 0 },
            { productId: 3, quantity: 1, price: 15000, price_usd: 50, discount: 5 },
            { productId: 4, quantity: 1, price: 22500, price_usd: 75, discount: 0 },
        ]
    },
    { 
        order: { userId: 4, total: 37500, totalUsd: 125, payment: "Tarjeta de crédito", address: "Calle Falsa 123" },
        orderItems: [
            { productId: 3, quantity: 1, price: 15000, price_usd: 50, discount: 0 },
            { productId: 4, quantity: 1, price: 22500, price_usd: 75, discount: 0 },
        ]
    },
]

// loops the array with the replacements for each user 
users.forEach(user => {
    sequelize.query('INSERT INTO users (username, name, surname, fullname, email, password, phone, status, admin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            {replacements: [user.username, user.name, user.surname, user.fullname, user.email, user.password, user.phone, true, false]}
    ).then(() => {
        console.log(`User ${user.username} created`);
    }).catch((err) => {
        console.log(err);
    });
});

// loops the array with the replacements for each product 
products.forEach(product => {
    sequelize.query(`INSERT INTO products (name, images, discount, price, price_usd, stock, collection, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
        {replacements: [product.name, product.images, product.discount, product.price, product.price_usd, product.stock, product.collection, product.description], raw: true}
    ).then(() => {
        console.log(`Product ${product.name} created`);
    }).catch((err) => {
        console.log(err);
    });
});

// loops the array with the replacements for each order
orders.forEach((orderData) => {
    const { order, orderItems } = orderData;
    sequelize.query('INSERT INTO orders (user_id, total, total_usd, order_status, payment, payment_status, tracking_code, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        {replacements: [order.userId, order.total, order.totalUsd, "Nuevo", order.payment, "Pendiente", null, order.address]}
    ).then((response) => {
        // creates a register for every ordered item
        orderItems.forEach(item => {
            sequelize.query('INSERT INTO order_items (order_id, product_id, quantity, price, price_usd, discount) VALUES (?, ?, ?, ?, ?, ?)',
                {replacements: [response[0], item.productId, item.quantity, item.price, item.price_usd, item.discount]}); 
        });
        console.log(`Order created`);
    }).catch((err) => {
        console.log(err);
    });
});
  