const models = require('../models');
const { errorMessage, checkHashPassword, hashPassword } = require('../libs/Helper');
const jwt = require('jsonwebtoken');

/**
 * POST /api/v1/registrations
 * Method create a new user.
 * @param req
 * @param res
 * @return {Promise<void>}
 */
const registration = async (req, res) => {
    try {
        const { firstName, lastName, email, password, rePassword } = req.body;

        if (!email || !password) {
            return res.status(400).json(errorMessage(400, 'Empty email or password fields'));
        }


        if (password !== rePassword) {
            return res.status(400).json({
                code: 400,
                message: 'Password mismatch'
            });
        }

        const emailExist = await models.Users.count({
            where: {
                email
            }
        });

        if (emailExist > 0) {
            return res.status(400).json(errorMessage(400, 'Email already exist'));
        }

        const user = await models.Users.create({
            firstName,
            lastName,
            email,
            password: hashPassword(password.toString()),
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return res.json(user);
    } catch (e) {
        return res.status(500).json(errorMessage(500, e.message));
    }
};

/** POST /api/v1/users/login
 * logging in system
 * @param req
 * @param res
 * @return {Promise<void>}
 */
const login = async (req, res) => {
    const { email, password } = req.body;
    let token = {};

    if (!email || !password) {
        return res.status(400).json(errorMessage(400, 'Empty email or password field'));
    }

    const user = await models.Users.findOne({
        where: {
            email
        }
    });

    if (!user) {
        return res.status(404).json(errorMessage(404, 'User not found'));
    }

    const data = {
        id: user.id,
        email: user.email
    };

    if (!checkHashPassword(password, user.password)) {
        return res.status(400).json(errorMessage(400, 'Incorrect password'));
    }

    token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data
    }, process.env.PRIVATEKEY);

    res.json({
        data,
        token
    });
};

/** PUT /api/v1/users/:id
 * Update own data
 * @param req
 * @param res
 * @return {Promise<void>}
 */
const editUser = async (req, res) => {
    const { firstName, lastName, email, password, rePassword } = req.body;

    const { id } = req.params;

    const user = await checkUserExist(id, res);

    if (password !== rePassword) {
        return res.status(400).json(errorMessage(400, 'Password mismatch'));
    }

    const updatedUserData = await user.update({
        firstName,
        lastName,
        email,
        password,
        updatedAt: new Date()
    });

    res.json(updatedUserData);
};

/** DELETE /api/v1/users/:id
 * Delete user by id
 * @param req
 * @param res
 * @return {Promise<void>}
 */
const destroy = async (req, res) => {
    const { id } = req.params;

    const user = await checkUserExist(id, res);

    const taskForUser = await models.Tasks.count({
        where: {
            userId: id
        }
    })

    if (taskForUser > 0) {
        return res.status(400).json(errorMessage(400, 'User have task.'));
    }

    await user.destroy();

    res.json({
        status: 'success'
    });
}

/** GET /api/v1/users/:id
 * Get data a user
 * @param req
 * @param res
 * @return {Promise<void>}
 */
const getUserData = async (req, res) => {
    const { id } = req.params;

    const user = await checkUserExist(id, res);

    res.json(user);
}

/** GET /api/v1/users
 * Get a all users
 * @param req
 * @param res
 * @return {Promise<void>}
 */
const list = async (req, res) => {
    const users = await models.Users.findAll({
        limit: req.query.limit,
        offset: req.query.offset
    });

    res.json(users);
}

/**
 * Check user exits
 * @param {number} id
 * @param res
 * @return {Promise<any>}
 */
const checkUserExist = async (id, res) => {
    const user = await models.Users.findByPk(id);

    if (!user) {
        return res.status(400).json(errorMessage(400, 'User not found.'));
    }

    return user;
}

module.exports = {
    registration,
    list,
    login,
    editUser,
    destroy,
    getUserData
}
