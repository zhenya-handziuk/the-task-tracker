const bcrypt = require('bcrypt');

/**
 *
 * @param {number} code
 * @param {string} message
 * @return {{code: *, message: *}}
 */
const errorMessage = (code, message) => {
    return {
        code,
        message
    };
};

/**
 * created a password hash
 * @param {string} password
 * @return {string} hash
 */
const hashPassword = (password) => {
    const salt = 10;

    return bcrypt.hashSync(password, salt);
}

/**
 * check send password and hash password
 * @param {string} sendPassword: not a hash password, which user introduces
 * @param {string} userPassword: hash password from database
 * @return {boolean}
 */
const checkHashPassword = (sendPassword, userPassword) => {
    return bcrypt.compareSync(sendPassword.toString(), userPassword);
}

module.exports = {
    errorMessage,
    hashPassword,
    checkHashPassword
}
