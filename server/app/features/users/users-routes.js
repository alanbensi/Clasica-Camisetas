// USER Endpoints

const { express } = require("../../config/config");
const users = require("./users-controllers");
const middlewares = require("../../middlewares");

let router = express.Router();

//  Login user
router.post('/login', users.login);

//  Create user
router.post('/', users.addUser);

//  Get users
router.get('/', middlewares.validateUser, users.getAll);

// Check existing email
router.get('/checkEmail', users.checkEmail);

//  Edit user
router.put('/:id', middlewares.validateUser, users.editUser);

//  Inactive user
router.put('/inactive/:id', middlewares.validateUser, users.inactiveUser);

module.exports = router;