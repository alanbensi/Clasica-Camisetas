// ALL Endpoints

const { express } = require("../../config/config");
const all = require("./all-controllers");
const middlewares = require("../../middlewares");

let router = express.Router();

// Get ALL User info, Orders and Auctions by User Id
router.get('/', middlewares.validateUser, all.getAllByUserId);

module.exports = router;