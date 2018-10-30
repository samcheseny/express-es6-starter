const router = require('express').Router();

const {UsersController} = require('../controllers');

router.get('/', UsersController.getAll);

router.post('/', UsersController.create);

module.exports = router;