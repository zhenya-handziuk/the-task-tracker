const models = require('../../src/models');

module.exports = function(factory) {
    factory.define('task', models.Tasks, {
        title: 'title',
        description: 'desc',
        status: 'View',
        userId: factory.assoc('user', 'id')
    });
};
