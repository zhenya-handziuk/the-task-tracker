const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const healthRouter = require('./routers/HealthRouter');


const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v2', [
    healthRouter
]);

app.listen(PORT || 3000, () => {
    console.log(`Server work in port ${PORT}`);
})
