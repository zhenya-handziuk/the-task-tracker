const jwt = require('jsonwebtoken');
const { ErrorHandler, errorMessage } = require('../libs/Helper');
require('dotenv').config();

/** Middleware
 * Check access charge to the resource
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {
    const headerAuth = req.headers['authorization'];
    const token = headerAuth && headerAuth.split(' ')[1];

    if (!token) {
        return res.status(400).json(errorMessage(400, 'Access is denied'));
    }

    jwt.verify(token, process.env.PRIVATEKEY, (err, user) => {
        if (err) {
            return res.status(400).json(errorMessage(400, 'Invalid Token'));
        }
        req.user = user;
        next();
    });
};
