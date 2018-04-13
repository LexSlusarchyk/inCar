'use strict';

const app = alias.require('@root/app'),
    usersService = require('../services/usersService'),
    User = require('../models/User'),
    nodemailer = require('nodemailer'),
    uuid = require('uuid'),
    Promise = require('bluebird');

module.exports = {
    signUp,
    login,
    list,
    getUser,
    updateUser,
    activate,
    requestPasswordChange
};


function signUp(req, res) {
    var user = new User(req.body);
    var query = user.create();

    var credentials = {
        clientId: '907024328522-l9vavbs4vp6grprh4ii44c300l8tjno0.apps.googleusercontent.com',
        clientSecret: 'pLTlKALph1XpqS26F4Hted5y',
        apiKey: 'AIzaSyB_JOeIjDHHhdfQ8o1ZMZzE4ypLONSsx60'
    };

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'incar.online@gmail.com',
            pass: 'rapass11'
        }
    });

    function sendEmailVerification(token) {
        var html = '<h3>Incar Online</h3>' +
            '<p>Recently you\'ve registered in our application using this email address.</p>' +
            '<p>Please follow the link below to continue.</p>' +
            '<p><a href="http://www.incar.online/confirm-email/' + token +'">Confirmation address</a></p>' +
            '<p>If you didn\'t register in our application using this email address, just ignore this message.</p>';

        transporter.sendMail({
            to: user.email,
            subject: 'Email Verification',
            html: html,
            text: 'hello world!'
        });
    }


    req.getConnection(function(err, connection) {
        if (err) return res.send(err);
        connection.query(query, function(err, results){
            if (err) return res.send(err);
            var token = uuid.v4();
            var tokenCreateQuery = 'INSERT INTO usertokens (userId, token) VALUES("'
                + results.insertId + '" , "' + token + '")';
            connection.query(tokenCreateQuery, function(err, results){
                if (err) return res.send(err);
                sendEmailVerification(token);
                return res.sendStatus(200);
            });
        })      
    })
}





function requestPasswordChange(req, res) {



    var query = "SELECT * FROM users WHERE email='" + req.body.email + "' AND isActivated='1';";

    var user;
    req.getConnection(function(err, connection) {
        if (err) return res.sendStatus(500);
        connection.query(query, function(err, results){
            if (err) return res.sendStatus(500);
            user = results[0];

            console.log(user.id);

            var token = uuid.v4();
            var tokenCreateQuery = 'INSERT INTO usertokens (userId, token) VALUES("'
                + user.id + '" , "' + token + '")';
            connection.query(tokenCreateQuery, function(err, results){
                if (err) return res.send(err);
                sendEmailVerification(token);
            });

            return res.sendStatus(200);
        })
    })


    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'incar.online@gmail.com',
            pass: 'rapass11'
        }
    });

    function sendEmailVerification(token) {
        var html = '<h3>Incar Online</h3>' +
            '<p>Recently you tried recover password in our application using this email address.</p>' +
            '<p>Please follow the link below to continue.</p>' +
            '<p><a href="http://www.incar.online/set-new-password/' + token +'">Change password</a></p>' +
            '<p>If you didn\'t register in our application using this email address, just ignore this message.</p>';

        transporter.sendMail({
            to: user.email,
            subject: 'Recover Password',
            html: html,
            text: 'hello world!'
        });
    }


}




function login(req, res) {
    var user = new User(req.body);
    var query = "SELECT * FROM users WHERE email='" + user.email + "' AND " + "password='" + user.password + "' AND isActivated='1';";

    req.getConnection(function(err, connection) {
        if (err) return res.send(err);
        connection.query(query, function(err, results){
            if (err) return res.send(err);
            if (results.length) {
                user = new User(results[0]);
                delete user.password;
                res.send({
                    userData: user,
                    token: user.generateToken()
                });
            } else {
                res.sendStatus(404);
            }
        })      
    })
}

function list(req, res) {
    var query = "SELECT * FROM users";
    req.getConnection(function(err, connection) {
        if (err) return res.sendStatus(500);
        connection.query(query, function(err, results){
            if (err) return res.sendStatus(500);
            res.send(results);
        })   
    })
}

function getUser(req, res) {
    var query = "SELECT * FROM users WHERE id='" + req.params.id + "'";
    var requestedUser;
    req.getConnection(function(err, connection) {
        if (err) return res.sendStatus(500);
        connection.query(query, function(err, results){
            if (err) return res.sendStatus(500);
            requestedUser = results[0];
            delete requestedUser.password;
            res.send(requestedUser);
        })   
    })
}

function activate(req, res) {
    var query = 'SELECT * FROM usertokens WHERE token="' + req.params.token + '"';

    req.getConnection(function(err, connection) {
        if (err) return res.send(err);
        connection.query(query, function(err, results){
            if (err) return res.send(err);
            var activateQuery = 'UPDATE users SET isActivated="1" WHERE id="' + results[0].userId + '"';
            connection.query(activateQuery, function(err, results) {
                if (err) return res.send(err);
                return res.send({
                    success: true
                });
            });
        });
    })
}

function updateUser(req, res) {
    var user = new User(req.body);
    var query = user.update();

    req.getConnection(function(err, connection) {
        if (err) return res.sendStatus(500);
        connection.query(query, function(err, results){
            if (err) return res.sendStatus(500);
            res.sendStatus(200);
        })      
    })
}




