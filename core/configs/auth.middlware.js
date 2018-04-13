const app = require('../../app'),
    jwt = require('jsonwebtoken');

module.exports = authMiddlware;

function authMiddlware(req, res, next) {
    var authHeader = req.headers.authorization;

    if (req.url === '/api/users/login' || req.url === '/api/users/signup' || req.url === '/api/users/reset'
        || req.url === '/api/payment/pay' || req.url === '/api/payment/free' || req.url === '/api/payment/securion'
    || req.url === '/api/payment/pokupo-confirm' || req.url === '/api/payment/pokupo-reserve') {
        return next();
    }

    if (req.method === 'GET' || req.method === 'OPTIONS') {
        return next();
    }

    if (authHeader) {
        var token = authHeader.split(' ')[1];
        var app = require('../../app');

        jwt.verify(token, "$2a$10$Hz1NaikezZdwlINa13ymo.", function (err, decoded) {
            if (!err) {
                req.tokenData = decoded;
                if (decoded.role === 'admin' || decoded.role === 'moderator') {
                    return next();
                } else if (decoded.role === 'user') {
                    if (req.url === '/api/users') {
                        return next();
                    }
                }
                res.sendStatus(401);
            } else {
                res.sendStatus(401);
            }
        });
    } else {
        res.sendStatus(401);
    }

    function sendError() {
        res.sendError({code: 'unauthorised'});
    }
}

