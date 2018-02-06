'use strict';

const app = alias.require('@root/app'),
    shortid = require('shortid'),
    Promise = require('bluebird'),
    helper = alias.require('@root/helper'),
    db = require('../../../core/db');

class Notification extends app.core.Model {
    constructor(params) {
        super(params);

        this.id = params.id;
        this.text = params.text || '';
        this.title = params.title || '';
        this.isActive = params.isActive ? 1 : 0;


        this.init(params);
    }

    afterInit(params) {
        var root = this;
        root.isActive = root.isActive ? 1 : 0;
    }

    load() {
        var root = this;
        var fields = ['id', 'title', 'text', 'isActive'];
        var query = 'SELECT * FROM notifications WHERE id="' + root.id + '"';
        var adData;

        return new Promise(function(resolve, reject) {
            db.query(query, function(err, results, query) {
                if (err) {
                    reject(err);
                }
                if(!err) {
                    adData = results[0];
                    for (var field in adData) {
                        if (fields.indexOf(field)) {
                            if (field === 'title') {
                                root[field] = helper.decodeSafeQuery(adData[field]);
                            } else {
                                root[field] = adData[field];
                            }
                        }
                    }
                    resolve(true);
                }
            });
        })
    }

    create() {
        var root = this;
        var fields = ['id', 'title', 'text', 'isActive'];
        var adData = helper.filterProperties(root, fields);
        adData.title = helper.safeQuery(adData.title);
        adData.text = helper.safeQuery(adData.text);
        var adDataToDb = helper.propertiesToDBDataset(adData);
        var query = 'INSERT INTO notifications SET ' + adDataToDb;

        return new Promise(function(resolve, reject) {
            db.query(query, function(err, results, query) {
                if (err) {
                    return reject(err);
                } else {
                    resolve(results);
                }
            })
        })
    }

    edit(params) {
        var root = this;
        var fields = ['id', 'title', 'text', 'isActive'];
        if (params) { root.init(params); }

        console.log(root);

        var adData = helper.filterProperties(root, fields);
        adData.title = helper.safeQuery(adData.title);
        adData.text = helper.safeQuery(adData.text);
        var adDataToDb = helper.propertiesToDBDataset(adData);
        var query = 'UPDATE notifications SET ' + adDataToDb + ' WHERE id="' + root.id + '" LIMIT 1';

        return new Promise(function(resolve, reject) {
            db.query(query, function(err, results, query) {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })
    }

    remove() {
        var root = this;
        var query = 'DELETE FROM notifications WHERE id="' + root.id + '"';

        return new Promise(function(resolve, reject) {
            db.query(query, function(err, results, query) {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })
    }
}

module.exports = Notification;



