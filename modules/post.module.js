const Post = require('../models/post.model.js');
const userModule = require('./user.module.js');


module.exports.findAllPosts = () => {
    return new Promise((resolve, reject) => {
        Post.findAllPosts().then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

module.exports.addPost = (post) => {
    return new Promise((resolve, reject) => {
        let userId = post.userId;
        userModule.findUserById(userId).then((user) => {
            if (user == null || user == undefined) {
                reject('Oups, Invalid user');
            }
            post.owner = {
                userId: user._id,
                username: user.username,
                profilePicture: user.profilePicture
            }

            Post.addPost(post).then((data) => {
                resolve(data);
            }).catch((err) => {
                console.log('err');
                console.log(err);
                reject(err);
            })

        })
    })
}

module.exports.findPostById = (id) => {
    return new Promise((resolve, reject) => {
        Post.findPostById(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

module.exports.findLatestPosts = () => {
    return new Promise((resolve, reject) => {
        Post.findLatestPosts().then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}