// AUCTIONS Endpoints

const { express } = require("../../config/config");
const bids = require("./bids-controllers");
const middlewares = require("../../middlewares");

let router = express.Router();

//  Create bid
router.post('/', bids.addBid);

//  Get all bids by auction id
router.get('/byAuction/:id', bids.getBidsByAuctionId);

//  Get all bids by user id
router.get('/byUser/:id', bids.getBidsByUserId);

//  Edit bid
router.put('/:id', bids.editBid);

module.exports = router;