'use strict';
global._ = require('underscore');
const http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator'),
    mysql = require('mysql'),
    myConnection = require('express-myconnection'),
    authMiddlware = require('./auth.middlware'),
     //dbOptions = {
     //    host: '127.0.0.1',
     //    user: 'root',
     //    password: 'pass',
     //    port: 3306,
     //    database: 'lnd'
     //};
    //  dbOptions = {
    //    host: 'aa13ggag4nzbrh6.cmc8dpsfffgd.us-west-2.rds.amazonaws.com',
    //    user: 'komix',
    //    password: 'intruder1',
    //    port: 3306,
    //    database: 'ebdb'
    //  };
    path = require('path'),
      dbOptions = {
        host: 'aa13ggag4nzbrh6.cmc8dpsfffgd.us-west-2.rds.amazonaws.com',
        user: 'komix',
        password: 'intruder1',
        port: 3306,
        database: 'ebdb'
      };

module.exports = {
    init
};

function init() {
    var host, port, app, server,
    publicPath = __dirname + '/../../public';
    const ENTRY_PATH = publicPath + '/index.html';

        host = '127.0.0.1';
        port = process.env.PORT || 8081;

    app = express();
    server = http.Server(app);



    app.use(myConnection(mysql, dbOptions, 'single'));

    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
      res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
      next();
    });

    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(expressValidator());
    app.use(authMiddlware);

    app.use(express.static(publicPath));

     //static middleware should be used before routes
    app.get('/', function(req, res) {
        res.sendFile(path.resolve(ENTRY_PATH));
    });

    app.get(/^\/(?!api).*/, function(req, res) {
        res.sendFile(path.resolve(ENTRY_PATH));
    });

    server.listen(port, host, function () {
        console.log('Server run and available at http://%s:%s', host, port);
    });

    return {server, app, host, port};
}