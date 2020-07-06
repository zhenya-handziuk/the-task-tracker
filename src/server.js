const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const healthRouter = require('./routers/HealthRouter');
const userRouter = require('./routers/UserRouter');
const taskRouter = require('./routers/TaskRouter');
const swaggerRouter = require('./routers/SwaggerRouter');


const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Swagger
app.use(swaggerRouter);

app.use('/api/v1', [
    healthRouter,
    userRouter,
    taskRouter
]);

const server = app.listen(PORT || 3000, () => {
    console.log(`Server work in port ${PORT}`);
})

module.exports = server;
