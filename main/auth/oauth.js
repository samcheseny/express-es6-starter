const oauth2orize = require('oauth2orize');
const passport = require('passport');
const {AccessToken, RefreshToken, User} = require('../models');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const server = oauth2orize.createServer();

//Resource owner password
server.exchange(oauth2orize.exchange.password((client, username, password, scope, done) => {

    User.findOne({where: {username: username}})
        .then(user => {

            if (!user) {
                return done(null, false);
            }

            bcrypt.compare(password, user.password, (error, response) => {

                if (!response) {
                    return done(null, false);
                }

                let token = utils.uid(256); //todo: have utils
                let refreshToken = utils.uid(256);
                let tokenHash = crypto.createHash('sha1').update(token).digest('hex');
                let refreshTokenHash = crypto.createHash('sha1').update(refreshToken).digest('hex');
                let expirationDate = new Date(new Date().getTime() + (3600 * 1000));

                let accessTokenObject = {
                    token: tokenHash,
                    expirationDate: expirationDate,
                    clientID: client.clientID,
                    userID: user.uuid,
                    scope: scope
                };

                AccessToken.create(accessTokenObject)
                    .then(createdAccessToken => {

                        let refreshTokenObject = {
                            refreshToken: refreshTokenHash,
                            clientID: client.clientID,
                            userID: user.uuid
                        };

                        RefreshToken.create(refreshTokenObject)
                            .then(createdRefreshToken => {
                                done(null, token, refreshToken, {expires_in: expirationDate});
                            })
                            .error(error => done(error));

                    })
                    .catch(error => done(error));

            });

        })
        .catch(error => done(error));

}));

//Refresh Token
server.exchange(oauth2orize.exchange.refreshToken((client, refreshToken, scope, done) => {

    let refreshTokenHash = crypto.createHash('sha1').update(refreshToken).digest('hex');

    RefreshToken.findOne({where: {refreshToken: refreshTokenHash}})
        .then(token => {

            if (!token) {
                return done(null, false);
            }

            let newAccessToken = utils.uid(256);
            let accessTokenHash = crypto.createHash('sha1').update(newAccessToken).digest('hex');
            let expirationDate = new Date(new Date().getTime() + (3600 * 1000));

            AccessToken.update(
                {token: accessTokenHash, scope: scope, expirationDate: expirationDate},
                {returning: true, where: {userID: token.userID}}
            )
                .then(token => done(null, newAccessToken, refreshToken, {expires_in: expirationDate}))
                .catch(error => done(error));

            //todo: handle token revocation
        })
        .catch(error => done(error));
}));

// Token endpoint
exports.token = [
    passport.authenticate(['clientBasic', 'clientPassword'], {session: false}),
    server.token(),
    server.errorHandler()
];