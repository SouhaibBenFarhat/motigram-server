const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Number,
        required: true,
        default: Date.now
    }

});

const Comment = module.exports = mongoose.model('Comment', commentSchema);



module.exports.findCommentByPostId = (postId) => {
    return new Promise((resolve, reject) => {
        Comment.find({ postId: postId }).sort({ createdAt: 'asc' }).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

module.exports.findLatestComments = (postId) => {
    return new Promise((resolve, reject) => {
        Comment.find({ postId: postId }).sort({ createdAt: 'asc' }).limit(3).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

module.exports.addComment = (comment) => {
    return new Promise((resolve, reject) => {
        Comment.create(comment).then((data) => {
            resolve(data);
        }).catch((err) => {
            console.log(err);
            reject(err);
        })
    })
}

