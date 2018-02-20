
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
    },
    createdAt: {
        type: Number,
        default: Date.now
    }

});

const Post = module.exports = mongoose.model('Post', postSchema);

module.exports.findAllPosts = () => {
    return new Promise((resolve, reject) => {
        Post.find({}).sort({ createdAt: 'asc' }).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

module.exports.findLatestPosts = () => {
    return new Promise((resolve, reject) => {
        Post.find({}).sort({ createdAt: 'asc' }).limit(3).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

module.exports.findPostById = (id) => {
    return new Promise((resolve, reject) => {
        Post.findById(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

module.exports.findPostByUsername = (username) => {
    return new Promise((resolve, reject) => {
        Post.find({ 'owner.username': username }).sort({ createdAt: 'asc' }).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

module.exports.addPost = (post) => {
    return new Promise((resolve, reject) => {
        Post.create(post).then((data) => {
            resolve(data);
        }).catch((err) => {
            console.log('err');
            console.log(err);
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