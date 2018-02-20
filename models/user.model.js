const mongoose = require('mongoose');
const config = require('../config/server.config.js');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    role: {
        type: String,
        default: "user"
    },
    membreSince: {
        type: String,
        default: Date.now
    },
    profilePicture: {
        type: String,
        default: config.defaultProfilePictureUrl
    }

});

const User = module.exports = mongoose.model('User', userSchema);


module.exports.findAllUsers = () => {
    return new Promise((resolve, rejecet) => {
        User.find({}).then((data) => {
            resolve(data);
        }).catch((err) => {
            rejecet(err);
        })
    })
}


module.exports.findUserById = (id) => {
    return new Promise((resolve, reject) => {
        User.findById(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}


module.exports.findUserByUsername = function (username) {
    return new Promise((resolve, reject) => {
        User.findOne({ "username": username }).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })

};

module.exports.addUser = (user) => {
    return new Promise((resolve, reject) => {
        User.create(user).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
};

module.exports.updateUser = (user) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(user._id, user, { new: true }).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

