const express = require('express');
const router = express.Router();
const response = require('dark-snow-response');
const postModule = require('../modules/post.module.js');




router.get('/', (req, res) => {

    let id = req.query.id;
    if (id != null && id != undefined) {
        postModule.findPostById(id).then((data) => {
            response.accepted(res, data);
        }).catch((err) => {
            response.badRequest(res, err);
        })
    } else {
        postModule.findAllPosts().then((data) => {
            response.accepted(res, data);
        }).catch((err) => {
            console.log(err);

            response.badRequest(res, err);
        })
    }
});

router.post('/', (req, res) => {
    if (req.body == null || req.body == undefined) {
        response.badRequest(res, 'Empty request');
        return;
    }
    postModule.addPost(req.body).then((data) => {
        response.accepted(res, data);
    }).catch((err) => {
        console.log('err');
        console.log(err);
        response.badRequest(res, err);
    })


})

router.get('/latest', (req, res) => {


    postModule.findLatestPosts().then((data) => {
        response.accepted(res, data);
    }).catch((err) => {
        console.log(err);
        response.badRequest(res, err);
    })

});

router.get('/:username', (req, res) => {
    postModule.findPostByUsername(req.params.username).then((data) => {
        response.accepted(res, data);
    }).catch((err) => {
        response.badRequest(res, err);
    })
})

router.get('/user/:postId', (req, res) => {

    postModule.findWhoCommented(req.params.postId).then((data) => {
        response.accepted(res, data);
    }).catch((err) => {
        console.log(err);
        response.badRequest(res, err);
    })

});





module.exports = router;

