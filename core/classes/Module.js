'use strict';

const fs = require('fs');

///////////////
class Module {
    constructor(path) {
        this.routes = isPathExist(path + '/routes.js') ? require(path + '/routes.js') : null;
        requireFolderFiles.apply(this, [path + '/controllers', 'controllers']);
        requireFolderFiles.apply(this, [path + '/models', 'models']);
        requireFolderFiles.apply(this, [path + '/services', 'service']);
        requireFolderFiles.apply(this, [path + '/classes']);
    }
}

function isPathExist(path) {
    var isFolderExist = true;

    try {
        fs.accessSync(path, fs.F_OK);
    } catch(e) {
        isFolderExist = false;
    }

    return isFolderExist;
}

function requireFolderFiles(folderPath, propertyObjectName) {
    var that = this;
    var isFolderExist;

    if (propertyObjectName) { that[propertyObjectName] = {}; }

    isFolderExist = isPathExist(folderPath);

    if (isFolderExist) {
        fs.readdirSync(folderPath).forEach(function(file) {
            if (file.match(/\.js$/) !== null && file !== 'index.js') {
                var name = file.replace('.js', '');

                if (propertyObjectName) {
                    that[propertyObjectName][name] = require(folderPath + '/' + file);
                } else {
                    that[name] = require(folderPath + '/' + file);
                }
            }
        });
    }

    return this;
}

module.exports = Module;