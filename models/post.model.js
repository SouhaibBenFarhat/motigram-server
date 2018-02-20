const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    description: {
        type: String
    },
    owner: {
        type: {
            userId: String,
            username: String,
            profilePicture: String,
        },
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    dislike: {
        type: Number,
        default: 0
    },
    interactions: {
        type: [{ userId: String, type: String }]
    }

});

const Post = module.exports = mongoose.model('Post', postSchema);

module.exports.findAllPosts = () => {
    return new Promise((resolve, reject) => {
        Post.find({}).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

module.exports.addPost = (post) => {
    return new Pormise((resolve, reject) => {
        Post.create(post).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

module.exports.updatePost = (post) => {
    return new Promise((resolve, reject) => {
        Post.findByIdAndUpdate(post._id, post, { new: true }).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}