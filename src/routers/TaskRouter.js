const express = require('express');
const router = express.Router();

const taskController = require('../controllers/TaskController');

const checkAuth = require('../middlewares/CheckAuth');

/**!
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - title
 *              - description
 *              - status
 *              - userId
 *              - rePassword
 *            properties:
 *              title:
 *                  type: string
 *                  example: title
 *              description:
 *                  type: string
 *                  example: description
 *              status:
 *                  type: string
 *                  example: "View"
 *     summary: Create new task
 *     tags:
 *       - Task
 *     produces:
 *       - application/json
 *     responses:
 *      200:
 *         description: OK
 *         content:
 *           application/json:
 *              schema:
 *               $ref: "#/components/schemas/Task"
 *      400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error400"
 *
 */
router.post('/tasks', checkAuth, taskController.createTask)

/**!
 * @swagger
 * /api/v1/tasks/{id}:
 *   put:
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              title:
 *                  type: string
 *                  example: title
 *              description:
 *                  type: string
 *                  example: description
 *              status:
 *                  type: string
 *                  example: "View"
 *              userId:
 *                  type: string
 *     security:
 *       - Bearer: []
 *     summary: Edit task data
 *     tags:
 *       - Task
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Task"
 *       400:
 *         description: Bad Request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error400"
 *       401:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error401"
 *       404:
 *         description: Not Found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error404"
 */
router.put('/tasks/:id', checkAuth, taskController.editTask);

/**!
 * @swagger
 * /api/v1/tasks/{id}:
 *   delete:
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: string
 *     security:
 *       - Bearer: []
 *     summary: Delete task
 *     tags:
 *       - Task
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Task
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                  status:
 *                      type: string
 *                      example: success
 *       404:
 *         description: Not Found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error404"
 */
router.delete('/tasks/:id', checkAuth, taskController.destroyTask);

/**!
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     parameters:
 *       - in: query
 *         name: filters
 *         schema:
 *            type: string
 *            example: [{"status": "View"}]
 *       - in: query
 *         name: sort
 *         schema:
 *            type: array
 *            example: [{"field":"Users.createdAt", "value":"desc"}]
 *     security:
 *       - Bearer: []
 *     summary: Returns tasks list
 *     tags:
 *       - Task
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Task"
 *       400:
 *         description: Bad Request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error400"
 */
router.get('/tasks', checkAuth, taskController.list);

module.exports = router;
