const Comment = require('../models/comment.model.js');


module.exports.findCommentByPostId = (postId) => {
    return new Promise((resolve, reject) => {
        Comment.findCommentByPostId(postId).then((data) => {
            resolve(data);
        }).catch((err) => {
            console.log(err);
            reject(err);
        })
    })
}

module.exports.addComment = (comment) => {
    return new Promise((resolve, reject) => {
        Comment.addComment(comment).then((data) => {
            resolve(data);
        }).catch((err) => {
            consle.log(err);
            reject(err);
        })
    })
}

module.exports.findLatestComments = (postId) => {
    return new Promise((resolve, reject) => {
        Comment.findLatestComments(postId).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}