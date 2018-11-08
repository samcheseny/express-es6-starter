const {User} = require('../models');
const bcrypt = require('bcryptjs');

class UsersController {

    getAll(request, response) {
        return User.all()
            .then(users => response.status(200).json(users))
            .catch(error => response.status(400).send(error));
    }

    register(request, response) {

        bcrypt.genSalt(10, (error, salt) => {

            if (error) {
                return response.status(400).send(error);
            }

            bcrypt.hash(request.body.password, salt, (error, hash) => {

                if (error) {
                    return response.status(400).send(error);
                }

                let user = {
                    name: request.body.name,
                    email: request.body.email,
                    clientID: request.body.clientID,
                    password: hash,
                };

                return User.create(user)
                    .then(user => response.status(201).json(user))
                    .catch(error => response.status(400).send(error));

            });

        });
    }

}

module.exports = new UsersController();