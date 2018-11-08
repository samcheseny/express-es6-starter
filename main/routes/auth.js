const router = require('express').Router();
const {OauthController, UsersController} = require('../controllers');
//const oauth = require('../controllers/oauth-controller');


router.post('/oauth/token', OauthController.token);

//router.post('/oauth/token', oauth.token);

router.post('/register', UsersController.register);

module.exports = router;