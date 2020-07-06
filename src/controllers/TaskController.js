const models = require('../models');

const { errorMessage } = require('../libs/Helper');

/** POST /api/v1/tasks
 * create task
 * @param req
 * @param res
 * @return {Promise<void>}
 */
const createTask = async (req, res) => {
    const { title, description, status } = req.body;

    if (status && !['View', 'In Progress', 'Done'].includes(status)) {
        return res.status(400).json(errorMessage(400, 'Wrong status'));
    }

    const task = await models.Tasks.create({
        title,
        description,
        status,
        userId: req.user.data.id,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    res.json(task);
}

/** PUT /api/v1/tasks/:id
 * Edit task data
 * @param req
 * @param res
 * @return {Promise<void>}
 */
const editTask = async (req, res) => {
    const { id } = req.params;

    const { title, description, status, userId } = req.body;

    const task = await checkTaskExist(id, res);

    if (status && !['View', 'In Progress', 'Done'].includes(status)) {
        return res.status(400).json(errorMessage(400, 'Wrong status'));
    }

    if (userId) {
        const user = await models.Users.count({
            where: { id: userId }
        });

        if (!user) {
            return res.status(404).json(errorMessage(404, 'User not found'));
        }

    }

    const updatedTask = await task.update({
        title,
        description,
        status,
        userId,
        updatedAt: new Date()
    });

    res.json(updatedTask);
}

/** DELETE /api/v1/tasks/:id
 * Delete single task
 * @param req
 * @param res
 * @return {Promise<void>}
 */
const destroyTask = async (req, res) => {
    const { id } = req.params;

    const task = await checkTaskExist(id, res);

    await task.destroy();

    res.json({
        status: 'success'
    });
}

/** GET /api/v1/tasks
 * Get a list of all task
 * @param req
 * @param res
 * @return {Promise<void>}
 */
const list = async (req, res) => {
    let { filters, sort } = req.query;
    let where = {};
    const order = [];

    if (filters) {
        const parenthesisCheck = isParenthesisMatching(filters)

        const toJson = parseString(filters);

        if (!parenthesisCheck || !toJson) {
            return res.status(400).json(errorMessage(400, 'Wrong query field'));
        }

        where = toJson;
    }

    if (sort) {
        const parenthesisCheck = isParenthesisMatching(sort)

        const toJson = parseString(sort);

        if (!parenthesisCheck && !toJson) {
            return res.status(400).json(errorMessage(400, 'Wrong query sort'));
        }

        order.push([models.sequelize.col(`${toJson.field}`), `${toJson.value}`]);
    }

    const tasks = await models.Tasks.findAll({
        where,
        include: [{
            attributes: ['id', 'createdAt'],
            model: models.Users,
            as: 'Users',
            required: true
        }],
        order
    });

    res.json(tasks);

}

/**
 * check if task exist
 * @param {number} id
 * @param res
 * @return {Promise<any>}
 */
async function checkTaskExist(id, res) {
    const task = await models.Tasks.findByPk(id);

    if (!task) {
        return res.status(400).json(errorMessage(400, 'Task not found'));
    }

    return task;
}

/**
 * Сhecking for brackets
 * @param {string} str
 * @return {boolean}
 */
function isParenthesisMatching (str) {
    let stack = [];

    let open = {
        '{': '}',
        '[': ']'
    };

    let closed = {
        '}': true,
        ']': true,
    }

    for (let i = 0; i < str.length; i++) {

        let char = str[i];

        if (open[char]) {
            stack.push(char);
        } else if (closed[char]) {
            if (open[stack.pop()] !== char) return false;
        }
    }
    return stack.length === 0;
}

/**
 * Check or string can parse
 * @param {string} str
 * @return {boolean|*|{}}
 */
function parseString(str) {
    let result = {};
    try {
        result = JSON.parse(str);
    } catch (e) {
        return false;
    }
    return result;
}

module.exports = {
    createTask,
    editTask,
    destroyTask,
    list
}
