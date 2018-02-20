const express = require('express');
const router = express.Router();
const response = require('dark-snow-response');
const helpers = require('../helpers/helpers');
const config = require('../config/server.config.js');


const register = require('../modules/auth.module.js').register;
const login = require('../modules/auth.module.js').login;
const getInfoFromToken = require('../modules/auth.module.js').getInfoFromToken;

router.post('/login', function (req, res) {
    let password = req.body.password;
    let username = req.body.username;
    login(username, password).then((data) => {
        response.json(res, helpers.removeExtraFieldsFromUserOnLogin(data));
    }).catch((err) => {
        console.log(err);
        res.status(404);
        res.json({
            "status": 404,
            "message": err

        });
    })

});





router.post('/register', (req, res) => {
    register(req.body).then((data) => {
        response.json(res, helpers.removeExtraFieldsFromUserOnLogin(data));
    }).catch((err) => {
        response.badRequest(res, err);
    });
});

router.get('/info', (req, res) => {
    let header = req.headers.authorization;
    let arr = header.split(' ');
    if (arr[0] !== config.BEARER) {
        response.badRequest(res, 'Not a valid request');
        return;
    }
    let token = arr[1];
    getInfoFromToken(token).then((data) => {
        response.accepted(res, helpers.removeExtraFieldsFromUserOnLogin(data));
    }).catch((err) => {
        response.badRequest(res, err);
    });

});




module.exports = router;