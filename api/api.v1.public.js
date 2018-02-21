var express = require('express');
var router = express.Router();


const authRouter = require('../routes/auth.router.js');


// File Upload Router
router.use("/upload", express.static('uploads'));
router.use('/auth', authRouter);

module.exports = router;