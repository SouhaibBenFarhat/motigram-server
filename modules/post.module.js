const Post = require('../models/post.model.js');
const userModule = require('./user.module.js');
const commentModule = require('./comment.module.js');

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

module.exports.findPostByUsername = (username) => {
    return new Promise((resolve, reject) => {
        Post.findPostByUsername(username).then((data) => {
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


module.exports.findWhoCommented = (postId) => {
    return new Promise((resolve, reject) => {
        let addedUsersId = [String];
        let users = [];
        let iterations = 0;
        commentModule.findCommentByPostId(postId).then((data) => {
            iterations = data.length
            for (let i = 0; i < iterations; i++) {

                userModule.findUserById(data[i].userId).then((user) => {
                    users.push(user);
                    if (i == iterations - 1) {
                        let filteredArr = removeDuplicates(users, 'id');
                        console.log(filteredArr);
                        resolve(filteredArr);
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    });

    function removeDuplicates(myArr, prop) {
        return myArr.filter((obj, pos, arr) => {
            return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
        });
    }


}