const { app } = require("./app/config/config");

// ROUTES
// Users
app.use('/users', require('./app/features/users/users-routes'));
// Products
app.use('/products', require('./app/features/products/products-routes'));
// Orders
app.use('/orders', require('./app/features/orders/orders-routes'));
// All
app.use('/all', require('./app/features/all/all-routes'));

// Indicates the server is working
app.listen(3001, () => {
    console.log('Server running in port 3001...');
});
