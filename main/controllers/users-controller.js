const {User, AccessToken, RefreshToken} = require('../models');
const bcrypt = require('bcryptjs');

class UsersController {

    getAll(request, response) {
        return User.findAll()
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

    logout(request, response) {

        //todo: validation
        //todo: use correct http status codes
        //todo: return user info to client alongside token on login
        let authUser = request.body.user;

        return User.findOne({where: {email: authUser.email, id: authUser.id}})
            .then(user => {

                if (!user) {
                    return response.status(404).json(user);
                }

                AccessToken.update(
                    {revoked: true},
                    {returning: true, plain: true, where: {userID: authUser.id, revoked: false}}
                )
                    .then(token => {

                        //todo: add response to send
                        if (!token[1].dataValues) {
                            return response.status(404).send(null);
                        }

                        RefreshToken.update(
                            {revoked: true},
                            {where: {userID: authUser.id, revoked: false}}
                        )
                            .then(refreshToken => console.log(refreshToken))
                            .catch(error => console.log(error));

                    })
                    .catch(error => response.status(400).send(error));

            })
            .catch(error => response.status(400).send(error));

    }

}

module.exports = new UsersController();