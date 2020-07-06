const express = require('express');
const router = express.Router();

const healthController = require('../controllers/HealthConroller');

/**!
 * @swagger
 * /api/v1/health:
 *   get:
 *     summary: Returns server health status
 *     description: A health endpoint is only meaningful in the context of the component it indicates the health of.
 *     tags:
 *       - Health
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Healthy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Health"
 *       400:
 *         description: Unhealthy.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error400"
 * components:
 *   securitySchemes:
 *     Bearer:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Health:
 *       type: object
 *       properties:
 *         code:
 *           type: number
 *           example: 200
 *         message:
 *           type: string
 *           example: success
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The user ID.
 *           example: 999
 *         email:
 *           type: string
 *           description: The user email.
 *           example: example@gmail.com
 *         firsName:
 *           type: string
 *           description: The user first name.
 *           example: John
 *         lastName:
 *           type: string
 *           description: The user last name.
 *           example: Dou
 *         password:
 *           type: string
 *           description: The user password.
 *           example: 11111
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The task ID.
 *           example: 999
 *         title:
 *           type: string
 *           description: The task title.
 *           example: title
 *         description:
 *           type: string
 *           description: The task description.
 *           example: description
 *         status:
 *           type: string
 *           description: The task status.
 *           example: View
 *         userId:
 *           type: string
 *           description: The user id.
 *           example: 1
 *     Error400:
 *       type: object
 *       properties:
 *         code:
 *           type: integer
 *           example: 400
 *         message:
 *           type: string
 *           example: BadRequest
 *     Error401:
 *       type: object
 *       properties:
 *         code:
 *           type: integer
 *           example: 401
 *         message:
 *           type: string
 *           example: Unauthorized
 *     Error403:
 *       type: object
 *       properties:
 *         code:
 *           type: integer
 *           example: 403
 *         message:
 *           type: string
 *           example: Forbidden
 *     Error404:
 *       type: object
 *       properties:
 *         code:
 *           type: integer
 *           example: 404
 *         message:
 *           type: string
 *           example: NotFound
 */
router.get('/health', healthController.health);

module.exports = router;
