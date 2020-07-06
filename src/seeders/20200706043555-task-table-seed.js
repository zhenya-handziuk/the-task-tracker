'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Tasks', [{
            title: 'title',
            description: 'description',
            userId: 1,
            status: 'View',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            title: 'title',
            description: 'description',
            userId: 2,
            status: 'Done',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            title: 'title',
            description: 'description',
            userId: 3,
            status: 'In Progress',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            title: 'title',
            description: 'description',
            userId: 4,
            status: 'Done',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            title: 'title',
            description: 'description',
            userId: 5,
            status: 'View',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            title: 'title',
            description: 'description',
            userId: 6,
            status: 'View',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            title: 'title',
            description: 'description',
            userId: 7,
            status: 'View',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            title: 'title',
            description: 'description',
            userId: 8,
            status: 'In Progress',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            title: 'title',
            description: 'description',
            userId: 9,
            status: 'View',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Tasks', null, {});
    }
};
