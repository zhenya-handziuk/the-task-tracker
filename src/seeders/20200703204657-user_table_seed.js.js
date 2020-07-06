'use strict';
const { hashPassword } = require('../libs/Helper');
const faker = require('faker');

module.exports = {
    up: (queryInterface, Sequelize) => {
        const data = [];
        for (let i = 0; i < 20; i++) {
            data.push({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                password: hashPassword('11111'),
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }

        return queryInterface.bulkInsert('Users', data);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
