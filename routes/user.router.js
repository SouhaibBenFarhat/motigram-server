const express = require('express');
const router = express.Router();
const response = require('dark-snow-response');
const userModule = require('../modules/user.module.js');
const helper = require('../helpers/helpers.js');




router.get('/:id', (req, res) => {

    let userId = req.params.id;
    userModule.findUserById(userId).then((data) => {
        response.accepted(res, helper.removeExtraFieldsFromUserOnLogin(data));
    }).catch((err) => {
        response.badRequest(res, err);
    })
});



module.exports = router;

