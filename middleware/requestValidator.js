const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');
const config = require('../config/server.config.js');



module.exports = function (req, res, next) {

    let token;
    let head;
    let prefix;
    if (req.headers['authorization']) {
        head = req.headers['authorization'].split(' ');
        prefix = head[0];
        token = head[1];

        if ((token != null) && (prefix === config.BEARER)) {
            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    console.log(err);

                    res.status(401);
                    res.json({
                        "status": 401,
                        "message": "Invalid Token or Key"
                    });
                    return;
                } else {
                    if (decoded == null || decoded == undefined) {
                        res.status(401);
                        res.json({
                            "status": 401,
                            "message": "invalid token or key"
                        });
                        return;
                    }
                    User.findUserByUsername(decoded.username).then((data) => {
                        if (data) {
                            next();
                        } else {
                            res.status(500);
                            res.json({
                                "status": 500,
                                "message": "user not found"
                            });
                        }
                    }).catch((err) => {
                        res.status(500);
                        res.json({
                            "status": 500,
                            "message": "user not found"

                        });
                    })
                }
            });

        } else {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid Token or Key"
            });
            return;
        }
    } else {
        res.status(500);
        res.json({
            "status": 500,
            "message": "user not found"

        });
        return;
    }
};