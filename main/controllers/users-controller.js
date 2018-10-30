const {User} = require('../models');

class UsersController {

    getAll(request, response) {
        //return response.json({user: "Samuel Ndara"});
        return User.all()
            .then(users => response.status(200).json(users))
            .catch(error => response.status(400).send(error));
    }

    create(request, response) {

    }

}

module.exports = new UsersController();