const passport = require('passport');
const {Strategy} = require('passport-http-bearer');
const {AccessToken, User} = require('../models');
const crypto = require('crypto');

passport.use("bearer", new Strategy(
    (token, done) => {

        let tokenHash = crypto.createHash('sha1').update(token).digest('hex');

        AccessToken.findOne({where: {token: tokenHash, revoked: false}})
            .then(accessToken => {

                if (!accessToken || new Date() > accessToken.expirationDate) {
                    return done(null, false);
                }

                User.findByPk(accessToken.userID)
                    .then(user => {

                        if (!user) {
                            return done(null, false);
                        }

                        return done(null, user);
                    })
                    .catch(error => done(error))

            })
            .catch(error => done(error));

    })
);

