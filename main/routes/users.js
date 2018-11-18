const router = require('express').Router();
const passport = require('passport');
const {UsersController} = require('../controllers');

router.get('/', UsersController.getAll);

module.exports = router;

//passport.authenticate('bearer', {session: false}),