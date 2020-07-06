const fs = require('fs');
const path = require('path');

module.exports = (dirPath, options = {}) => {
    const paths = {};

    options = Object.assign({
        ignore: []
    }, options);

    fs
        .readdirSync(dirPath)
        .filter(file => file.endsWith('.js') && !options.ignore.includes(file))
        .forEach(file => {
            const key = path.basename(file, path.extname(file));
            paths[key] = require(path.join(dirPath, file));
        });

    return paths;
};
