const faker = require('faker');
const models = require('../../src/models');
const { hashPassword } = require('../../src/libs/Helper');

module.exports = function(factory) {
    factory.define('user', models.Users, {
        firstName: () => faker.name.firstName(),
        lastName: () => faker.name.lastName(),
        email: () => faker.internet.email().toLowerCase(),
        password: () => hashPassword(faker.internet.password()),
    });
};
