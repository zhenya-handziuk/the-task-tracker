const factory = require('factory-girl').factory;

const requireDir = require('../../src/libs/RequireDir');

const constructors = requireDir(__dirname, {
    ignore: ['index.js']
});
Object.keys(constructors).forEach(key => {
    constructors[key](factory);
});

module.exports = factory;
