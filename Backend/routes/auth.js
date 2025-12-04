const router = require("express").Router();
const { register, login, getUser } = require("../controllers/auth");
const { authenticate } = require("../middleware/auth");

router.post('/register', register)
    .post('/login', login)
    .get('/user', authenticate, getUser);

module.exports = router;

