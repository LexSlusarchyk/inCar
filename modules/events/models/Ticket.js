'use strict';

const app = alias.require('@root/app'),
    shortid = require('shortid'),
    fileSystem = require("fs"),
    Promise = require('bluebird'),
    helper = alias.require('@root/helper'),
    db = require('../../../core/db');

class Ticket extends app.core.Model {
    constructor(params) {
        super(params);

        this.id = params.id;
        this.reservationId = params.reservationId;
        this.name = '';
        this.price = null;
        this.quantity = 0;
        this.eventId = null;
        this.eventImgUrl = '';
        this.eventName = '';


        this.init(params);
    }

    afterInit(params) {
        var root = this;
    }

    load() {
        var root = this;
        var query = 'SELECT * FROM tickets WHERE id="' + root.id + '"';
        var ticketData;
        var fields = ['eventId', 'eventImgUrl', 'eventName', 'id', 'name', 'price', 'quantity'];

        return new Promise(function(resolve, reject) {
            db.query(query, function(err, results, query) {
                if (err) {
                    reject(err);
                } else {
                    ticketData = results[0];
                    for (var field in ticketData) {
                        if (fields.indexOf(field) !== -1) {
                            root[field] = ticketData[field];
                        }
                    }
                    resolve(true);
                }
            });
        })
    }

    buy(userId, eventName, eventId) {
        var root = this;
        var ticketData = {
            userId: userId,
            ticketId: root.id,
            eventName: eventName,
            eventId: eventId
            //createdAt: new Date()
        };
        var userQuery = "SELECT * FROM users WHERE id='" + userId + "'";
        var decrementQuery = 'UPDATE tickets SET quantity="' + (root.quantity - 1) + '" WHERE id="' + root.id + '"';

        return new Promise(function(resolve, reject) {
            if (root.quantity < 1) {
                reject('no more tickets');
            }

            db.query(userQuery, function(err, results) {
                if (err) { return reject(err);}
                var user = results[0];
                ticketData.userEmail = user.email;

                var ticketDataToDb = helper.propertiesToDBDataset(ticketData);
                var createQuery = 'INSERT INTO boughttickets SET ' + ticketDataToDb;

                db.query(createQuery, function(err, results, query) {
                    if (err) {
                        reject(err);
                    } else {
                        db.query(decrementQuery, function(err, results, query) {
                            if (err) {
                                reject(err)
                            } else {
                                resolve(true);
                            }
                        });
                    }
                })
            });
        })
    }

    reserve(userId, token) {
        var root = this;

        return new Promise(function(resolve, reject) {
            if (!userId || !root.id) {
                reject('incorrect params');
            }

            var query = 'INSERT INTO reservedtickets (userID, ticketId, token) VALUES("'
                + userId + '" , "' + root.id + '" , "' + token + '")';

            db.query(query, function(err, results) {
                if (err) { return reject(err);}
                resolve(true);
            });
        })
    }

    loadReserved(token) {
        return new Promise(function(resolve, reject) {
            var query = 'SELECT * FROM reservedtickets WHERE token="' + token + '" AND isActivated IS NULL';

            db.query(query, function(err, results) {
                if (err) { return reject(err);}
                resolve(results[0]);
            });
        })
    }
}

Ticket.prototype.toString = toString;
Ticket.toString = toString;

module.exports = Ticket;


function toString() {
    return this.name;
}