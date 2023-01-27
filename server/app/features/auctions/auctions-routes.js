// AUCTIONS Endpoints

const { express } = require("../../config/config");
const auctions = require("./auctions-controllers");
const middlewares = require("../../middlewares");

let router = express.Router();

//  Create auction
router.post('/', middlewares.adminAuth, auctions.addAuction)

//  Get all auctions
router.get('/', auctions.getAll);

//  Get all active auctions
router.get('/active', auctions.getActiveAuctions);

//  Get all closed auctions
router.get('/closed', auctions.getClosedAuctions);

//  Get auction by id 
router.get('/id/:id', auctions.getById);

//  Edit auction by auction id
router.put('/:id', auctions.editAuction);

//  Edit status auction to closed by auction id
router.put('/close/:id', middlewares.adminAuth, auctions.closeAuction);

//  Delete auction
router.delete('/:id', middlewares.adminAuth, auctions.deleteAuction);

module.exports = router;