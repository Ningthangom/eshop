const expressJwt = require('express-jwt');

function authJwt() {
    const jwt_secret = process.env.jwt_secret;
    return expressJwt({
        secret:jwt_secret,
        algorithms: ['HS256']
    })
}

module.exports = authJwt;