'use strict';

const app = alias.require('@root/app'),
    shortid = require('shortid'),
    fileSystem = require("fs"),
    Promise = require('bluebird'),
    helper = alias.require('@root/helper'),
    db = require('../../../core/db');

class BoughtTicket extends app.core.Model {
    constructor(params) {
        super(params);

        this.id = params.id;
        this.ticketId = params.ticketId || null;
        this.userId = params.userId || null;

        this.init(params);
    }

    afterInit(params) {
        var root = this;
    }

    load() {
        var root = this;
        var query = 'SELECT * FROM boughttickets WHERE id="' + root.id + '"';
        var ticketData;
        var fields = ['id', 'eventId', 'userId'];

        return new Promise(function(resolve, reject) {
            db.query(query, function(err, results, query, connection) {
                if (err) {reject(err);}


                ticketData = results[0];
                for (var field in ticketData) {
                    if (fields.indexOf(field)) {
                        root[field] = ticketData[field];
                    }
                }
                connection.release();
                resolve(true);
            });
        })
    }
}

module.exports = BoughtTicket;

