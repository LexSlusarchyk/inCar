'use strict';

const app = alias.require('@root/app'),
    shortid = require('shortid'),
    fileSystem = require("fs"),
    Promise = require('bluebird'),
    helper = alias.require('@root/helper'),
    db = require('../../../core/db');

class Ad extends app.core.Model {
    constructor(params) {
        super(params);

        this.id = params.id;
        this.catId = params.catId;
        this.title = params.title || '';
        this.url = params.url || '';
        this.imgUrl = params.imgUrl || '';
        this.wallpaper = params.wallpaper || '';
        this.priority = params.priority;
        this.baseLocation = params.baseLocation || null;
        this.location = params.location || null;
        this.isMainAd = params.isMainAd ? 1 : 0;
        this.isDisabled = params.isDisabled ? 1 : 0;

        this.init(params);
    }

    afterInit(params) {
        var root = this;
        root.isMainAd = root.isMainAd ? 1 : 0;
        root.isDisabled = root.isDisabled ? 1 : 0;
    }

    load() {
        var root = this;
        var fields = ['id', 'title', 'url', 'catId', 'imgUrl', 'wallpaper', 'priority', 'location', 'baseLocation', 'isMainAd', 'isDisabled'];
        var query = 'SELECT * FROM ads WHERE id="' + root.id + '"';
        var adData;

        return new Promise(function(resolve, reject) {
            db.query(query, function(err, results, query, connection) {
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
                    connection.release();
                    resolve(true);
                }
            });
        })
    }

    create() {
        var root = this;
        var fields = ['id', 'title', 'url', 'catId', 'imgUrl', 'wallpaper', 'priority', 'location', 'baseLocation', 'isMainAd', 'isDisabled'];
        var adData = helper.filterProperties(root, fields);
        adData.title = helper.safeQuery(adData.title);
        var adDataToDb = helper.propertiesToDBDataset(adData);
        var query = 'INSERT INTO ads SET ' + adDataToDb;

        return new Promise(function(resolve, reject) {
            db.query(query, function(err, results, query, connection) {
                if (err) {
                    return reject(err);
                } else {
                    connection.release();
                    resolve(results);
                }
            })
        })
    }

    edit(params) {
        var root = this;
        var fields = ['id', 'title', 'url', 'catId', 'imgUrl', 'wallpaper', 'priority', 'location', 'baseLocation', 'isMainAd', 'isDisabled'];
        if (params) { root.init(params); }

        var adData = helper.filterProperties(root, fields);
        adData.title = helper.safeQuery(adData.title);
        var adDataToDb = helper.propertiesToDBDataset(adData);
        var query = 'UPDATE ads SET ' + adDataToDb + ' WHERE id="' + root.id + '" LIMIT 1';

        return new Promise(function(resolve, reject) {
            db.query(query, function(err, results, query, connection) {
                if (err) {
                    reject(err);
                } else {
                    connection.release();
                    resolve(results);
                }
            })
        })
    }

    remove() {
        var root = this;
        var query = 'DELETE FROM ads WHERE id="' + root.id + '"';

        return new Promise(function(resolve, reject) {
            db.query(query, function(err, results, query, connection) {
                if (err) {
                    reject(err);
                } else {
                    connection.release();
                    resolve(results);
                }
            })
        })
    }
}


module.exports = Ad;

