const express = require('express');
const router = express.Router();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
require('dotenv').config();

const host = process.env.HOST
const port = process.env.PORT
const env = process.env.ENV
const server = env === 'development' ? `${host}:${port}` : host;

const swaggerDocument = swaggerJSDoc({
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'The Task Tracker',
            version: 'v1',
            description: 'Task API',
        },
        servers: [{url: server}],
        basePath: '/',
        components: {
            securitySchemes: {},
        },
    },
    apis: [
        path.resolve(__dirname, './HealthRouter.*'),
        path.resolve(__dirname, './UserRouter.js'),
        path.resolve(__dirname, './TaskRouter.js'),
    ],
});


router.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocument);
})

router.use('/', swaggerUI.serve);
router.get('/', swaggerUI.setup(swaggerDocument));

module.exports = router;
