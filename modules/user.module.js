const User = require('../models/user.model.js');



module.exports.findUserById = (id) => {
    return new Promise((resolve, reject) => {
        User.findUserById(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

module.exports.findUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
        User.findUserByUsername(username).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}