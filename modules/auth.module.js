
const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validate = require('hyvalidator').validate;
const Strings = require('hyvalidator').Strings;
const config = require('../config/server.config.js');

module.exports.register = (user) => {
    return new Promise((resolve, reject) => {
        let passwordToKeep = user.password;

        User.findUserByUsername(user.username).then((data) => {
            if (data) {
                reject('Username already taken');
            } else {
                let salt = bcrypt.genSaltSync(10);
                let hash = bcrypt.hashSync(user.password, salt);
                user.password = hash;
                user.salt = salt;
                User.addUser(user).then((data) => {
                    resolve(data);
                }).catch((err) => {
                    reject(err);
                });
            }
        }).catch(err => {
            reject(err);
        });


    });
}



module.exports.login = (username, password) => {
    return new Promise((resolve, reject) => {

        User.findUserByUsername(username).then((data) => {
            if (data) {
                if (bcrypt.compareSync(password, data.password)) {
                    let payload = {
                        username: data.username,
                        password: data.password,
                        role: data.role,
                    }
                    let token = jwt.sign(payload, config.secret);
                    let user = data;
                    user.token = token;
                    resolve(user);
                } else {
                    reject("Invalid Email or Password");
                }
            } else {
                reject('Invalid Email or Password');
            }

        }).catch((err) => {
            reject(err);
            console.log(err);

        })
    });

}


module.exports.getInfoFromToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                reject(err.message);
            } else {
                if (decoded == null || decoded == undefined) {
                    reject('Oups, Invalid Token...');
                }
                User.findUserByUsername(decoded.username).then((data) => {
                    if (data != null && data != undefined) {
                        resolve(data);
                    } else {
                        reject('User not found...');
                    }
                }).catch((err) => {
                    reject(err);
                });
            }
        });

    })
}


