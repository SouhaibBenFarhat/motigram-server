module.exports.removeExtraFieldsFromUserOnLogin = function (data) {
    let user = data.toObject();
    delete user.password;
    delete user.salt;
    return user;
}