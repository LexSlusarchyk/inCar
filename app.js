var express  = require('express'),
    shortid = require('shortid'),
    Alias = require('require-alias'),
    helper = require('./helper'),
    expressRunner = require('./core/configs/express-server'),
    core = {},
    app = express();

helper.requireFolderFiles.apply(core, [__dirname + '/core/classes']);
express = expressRunner.init();
module.exports = {
    app: express.app,
    core
};

setPathAliases();
enableModules();

function enableModules() {
    console.log('Enabling application modules...');

    alias.require('@module/users');
    alias.require('@module/categories');
    alias.require('@module/events');
    alias.require('@module/media');
    alias.require('@module/payment');
    alias.require('@module/tickets');
    alias.require('@module/geography');
    alias.require('@module/news');
    alias.require('@module/ads');
    alias.require('@module/texts');
    alias.require('@module/notifications');

    console.log('Enabling application modules: DONE');
}

function setPathAliases() {
    global.alias = new Alias({
        aliases: {
            '@root': './',
            '@module': './modules'
        }
    });
}


