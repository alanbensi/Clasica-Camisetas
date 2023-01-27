// ORDERS Endpoints

const { express } = require("../../config/config");
const orders = require("./orders-controllers");
const middlewares = require("../../middlewares");

let router = express.Router();

//  Create Order
router.post('/', middlewares.validateUser, orders.addOrder)

//  Get all orders or orders by any user id for admin or all orders for logged user id
router.get('/', middlewares.validateUser, orders.getOrders);

//  Get order by id 
router.get('/:id', middlewares.adminAuth, orders.getById);

//  Check order stock
router.get('/check/stock', middlewares.adminAuth, orders.checkStock);

//  Edit status of the order by order id
router.put('/:id', middlewares.adminAuth, orders.editOrder);

//  Cancel order
router.put('/cancel/:id', middlewares.adminAuth, orders.cancelOrder);

//  Delete order
router.delete('/:id', middlewares.adminAuth, orders.deleteOrder);

module.exports = router;