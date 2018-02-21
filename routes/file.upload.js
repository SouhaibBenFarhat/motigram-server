const router = require('express').Router();
const rcsres = require('dark-snow-response');
const authModule = require('../modules/auth.module.js');
const userModule = require('../modules/user.module.js');
const config = require('../config/server.config.js');
var path = require('path');

router.post('/', function (req, res) {
    console.log(req.files.file);
    if (!req.files)
        return rcsres.badRequest(res, 'No files were uploaded.');

    let fileExtension = path.extname(req.files.file.name);
    if (!fileExtension && (fileExtension !== ".png" || fileExtension !== ".jpg")) {
        rcsres.badRequest(res, 'The uploaded file is not an image.');
        return;
    }

    let prefix = Date.now();
    let file = req.files.file;
    let destination = "/uploads/" + prefix + ".jpg";
    file.mv("." + destination, function (err) {
        if (err) {
            return rcsres.error(res, err);
        } else {

            res.status(202);
            res.json({
                "status": 202,
                "message": "Upload done.",
                "path": config.serverAddress + '/api/upload/' + prefix + '.jpg'
            });

        }
    });


});

module.exports = router;
