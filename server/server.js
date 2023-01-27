const { app } = require("./app/config/config");
const { handleError } = require("./app/middlewares");

// Applies middleware to handle server error to all paths
app.use(handleError);

// ROUTES
// Users
app.use('/users', require('./app/features/users/users-routes'));
// Products
app.use('/products', require('./app/features/products/products-routes'));
// Orders
app.use('/orders', require('./app/features/orders/orders-routes'));
// Auctions
app.use('/auctions', require('./app/features/auctions/auctions-routes'));
// Bids
app.use('/bids', require('./app/features/bids/bids-routes'));
// All
app.use('/all', require('./app/features/all/all-routes'));

// Indicates the server is working
app.listen(3001, () => {
    console.log('Server running in port 3001...');
});
