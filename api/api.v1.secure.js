var express = require('express');
var router = express.Router();

//request validator middleware
const requestValidator = require('../middleware/requestValidator.js');


//routes files
const postRouter = require('../routes/post.router.js');
const commentRouter = require('../routes/comment.router.js');
const userRouter = require('../routes/user.router.js');

router.use(requestValidator);
router.use('/post', postRouter);
router.use('/comment', commentRouter);
router.use('/user', userRouter);






module.exports = router;