const {User} = require('../models');

class UsersController {

    getAll(request, response) {
        return User.all()
            .then(users => response.status(200).json(users))
            .catch(error => response.status(400).send(error));
    }

    create(request, response) {
        let user = {
            userName: request.body.userName,
            password: request.body.password,
        };

        return User.create(user)
            .then(user => response.status(201).json(user))
            .catch(error => response.status(400).send(error));
    }

    login(request, response) {

    }

}

module.exports = new UsersController();