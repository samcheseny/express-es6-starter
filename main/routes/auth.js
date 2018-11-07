const router = require('express').Router();
const {UsersController} = require('../controllers');
const oauth = require('../auth/oauth');


router.post('/oauth/token', oauth.token);

router.post('/login', UsersController.login);

router.post('/register', UsersController.create);

module.exports = router;