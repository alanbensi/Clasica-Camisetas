// PRODUCTS Endpoints

const { express } = require("../../config/config");
const products = require("./products-controllers");
const middlewares = require("../../middlewares");

let router = express.Router();

//  Create product
router.post('/', middlewares.adminAuth, products.addProduct);

//  Get products
router.get('/', products.getAll);

//  Get product by id
router.get('/:id', products.getById);

// Get products by collection
router.get('/collections/:collection', products.getByCollection);

// Get products with discount
router.get('/productsWithDiscount', products.getWithDiscount);

//  Edit product
router.put('/:id', middlewares.adminAuth, products.editProduct);

//  Delete product
router.delete('/:id', middlewares.adminAuth, products.deleteProduct);

module.exports = router;
