const express = require('express');
const router = express.Router();
const response = require('dark-snow-response');
const commentModule = require('../modules/comment.module.js');


router.get('/:postId', (req, res) => {

    let postId = req.params.postId;
    commentModule.findCommentByPostId(postId).then((data) => {
        response.accepted(res, data);
    }).catch((err) => {
        response.badRequest(res, err);
    });

});

router.get('/user/:userId', (req, res) => {

    let userId = req.params.userId;
    commentModule.findCommentsByUserId(userId).then((data) => {
        response.accepted(res, data);
    }).catch((err) => {
        response.badRequest(res, err);
    });

});

router.get('/latest/:postId', (req, res) => {

    let postId = req.params.postId;
    commentModule.findLatestComments(postId).then((data) => {
        response.accepted(res, data);
    }).catch((err) => {
        response.badRequest(res, err);
    });

});

router.post('/', (req, res) => {

    if (req.body == null || req.body == undefined) {
        response.badRequest(res, 'Empty request');
        return;
    }


    commentModule.addComment(req.body).then((data) => {
        response.accepted(res, data);
    }).catch((err) => {
        console.log(err);
        response.badRequest(res, err);
    });

});


module.exports = router;

