'use strict';

const app = alias.require('@root/app'),
    shortid = require('shortid'),
    Notification = require('../models/Notification'),
    helper = alias.require('@root/helper');

module.exports = {
    getNotifications: getNotifications,
    getNotification: getNotification,
    createNotification: createNotification,
    editNotification: editNotification,
    deleteNotification: deleteNotification
};


function getNotifications(req, res) {
    var query = 'Select * FROM notifications';

    req.getConnection(function(err, connection) {
        if (err) return res.send(err);
        connection.query(query, function(err, results){
            if (err) return res.send(err);
            res.send(results);
        })
    })
}


function getNotification(req, res) {
    var notification = new Notification({id: req.params.id});
    notification.load()
        .then(function(response) {
            res.send(notification);
        })
        .catch(function (err) {
            return res.send(err);
        });
}

function createNotification(req, res) {
    var notification = new Notification(req.body);
    notification.create()
        .then(function(response) {
            return res.send(response);
        })
        .catch(function (err) {
            return res.send(err);
        });
}

function editNotification(req, res) {
    var notification = new Notification({id: req.params.id});
    notification.load()
        .then(function(response) {
            notification.edit(req.body)
                .then(function(data){
                    return res.send(data);
                })
                .catch((err) => { return res.send(err) });
        })
        .catch((err) => { return res.send(err) });
}

function deleteNotification(req, res) {
    var notification = new Notification({id: req.params.id});
    notification.remove()
        .then(function(response) {
            return res.send(response);
        })
        .catch((err) => { return res.send(err) });
}







