const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');

const checkAuth = require('../middlewares/CheckAuth');
const pagination = require('../middlewares/Pagination');

/**!
 * @swagger
 * /api/v1/users/registration:
 *   post:
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - firstName
 *              - lastName
 *              - email
 *              - password
 *              - rePassword
 *            properties:
 *              firstName:
 *                  type: string
 *                  example: John
 *              lastName:
 *                  type: string
 *                  example: Dou
 *              email:
 *                  type: string
 *                  example: example@gmail.com
 *              password:
 *                  type: string
 *                  example: 11111
 *              rePassword:
 *                  type: string
 *                  example: 11111
 *     summary: Create new user
 *     tags:
 *       - User
 *     produces:
 *       - application/json
 *     responses:
 *      200:
 *         description: OK
 *         content:
 *           application/json:
 *              schema:
 *               $ref: "#/components/schemas/User"
 *      400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error400"
 *
 */
router.post('/users/registration', userController.registration);

/**!
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                  type: string
 *                  example: example@gmail.com
 *              password:
 *                  type: string
 *                  example: 11111
 *     summary: User login
 *     tags:
 *       - User
 *     produces:
 *       - application/json
 *     responses:
 *      200:
 *         description: OK
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      data:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: number
 *                                  example: 1
 *                              email:
 *                                  type: string
 *                                  example: example@gmail.com
 *                      token:
 *                           type: string
 *                           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTM4ODc0OTQsImRhdGEiOnsiaWQiOjIsImVtYWlsIjoiYWRtaW4xQGdtYWlsLmNvbSJ9LCJpYXQiOjE1OTM4ODM4OTR9.xGmJXOjcg14QR6EtL1lhdofPCMs67AzhBGq-TM3_JPA"
 *      400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error400"
 *      404:
 *         description: Not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error404"
 *
 */
router.post('/users/login', userController.login);

/**!
 * @swagger
 * /api/v1/users:
 *   get:
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *            type: string
 *     security:
 *       - Bearer: []
 *     summary: Returns list of users
 *     tags:
 *       - User
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/User"
 *       400:
 *         description: Unhealthy.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */
router.get('/users', checkAuth, pagination, userController.list);

/**!
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: string
 *     security:
 *       - Bearer: []
 *     summary: Getting user data
 *     tags:
 *       - User
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       404:
 *         description: Not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error404"
 */
router.get('/users/:id', checkAuth, userController.getUserData);

/**!
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - firstName
 *              - lastName
 *              - email
 *              - password
 *              - rePassword
 *            properties:
 *              firstName:
 *                  type: string
 *                  example: John
 *              lastName:
 *                  type: string
 *                  example: Dou
 *              email:
 *                  type: string
 *                  example: example@gmail.com
 *              password:
 *                  type: string
 *                  example: 11111
 *              rePassword:
 *                  type: string
 *                  example: 11111
 *     security:
 *       - Bearer: []
 *     summary: Edit user data
 *     tags:
 *       - User
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
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
router.put('/users/:id', checkAuth, userController.editUser);

/**!
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: string
 *     security:
 *       - Bearer: []
 *     summary: Delete user
 *     tags:
 *       - User
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Users
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
router.delete('/users/:id', checkAuth, userController.destroy);

module.exports = router;
