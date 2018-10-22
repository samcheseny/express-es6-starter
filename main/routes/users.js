const router = require('express').Router();

const {usersController} = require('../controllers');

router.get('/', usersController.getAll);

router.post('/', usersController.create);

module.exports = router;