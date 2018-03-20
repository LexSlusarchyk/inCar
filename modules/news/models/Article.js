'use strict';

const app = alias.require('@root/app'),
    shortid = require('shortid'),
    fileSystem = require("fs"),
    Promise = require('bluebird'),
    helper = alias.require('@root/helper'),
    db = require('../../../core/db');

class Article extends app.core.Model {
    constructor(params) {
        super(params);

        this.id = params.id;
        this.catId = params.catId;
        this.title = params.title || '';
        this.snippet =  params.snippet|| '';
        this.date = params.date || null;
        this.imgUrl = params.imgUrl || '';
        this.baseLocation = params.baseLocation || null;
        this.location = params.location || null;
        this.text = params.text || '';


        this.init(params);
    }

    afterInit(params) {
        var root = this;
        console.log('after init');
    }

    load() {
        var root = this;
        var query = 'SELECT * FROM news WHERE id="' + root.id + '"';
        var fields = ['id', 'title', 'catId', 'snippet', 'date', 'imgUrl', 'location', 'baseLocation', 'text'];
        var fieldsToDecode = ['title', 'snippet', 'location', 'baseLocation', 'text'];
        var articleData;
        var filteredArticleData;
        var decodedArticleData;

        return new Promise(function(resolve, reject) {
            db.getConnection(function(err, connection) {
                connection.query(query, function(err, results, query, connection) {
                    if (err) {
                        reject('error');
                    }
                    if(!err) {
                        articleData = results[0];
                        filteredArticleData = helper.filterProperties(articleData, fields);
                        decodedArticleData = root.decodeArticleData(articleData, fieldsToDecode);

                        root.init(decodedArticleData);
                        connection.release();
                        resolve(true);
                    }
                });
            });
        })
    }

    create() {
        var root = this;
        var fields = ['id', 'title', 'catId', 'snippet', 'date', 'imgUrl', 'location', 'baseLocation', 'text'];
        var fieldsToEncode = ['title', 'snippet', 'location', 'baseLocation', 'text'];
        var articleData = helper.filterProperties(root, fields);
        var articleDataEncoded = this.encodeArticleData(articleData, fieldsToEncode);
        var articleDataToDb = helper.propertiesToDBDataset(articleDataEncoded);
        var query = 'INSERT INTO news SET ' + articleDataToDb;

        return new Promise(function(resolve, reject) {
            db.getConnection(function(err, connection) {
                connection.query(query, function(err, results, query, connection) {
                    if (err) {
                        return reject(err);
                    } else {
                        connection.release();
                        resolve(results);
                    }
                })
            });
        })
    }

    edit(params) {
        var root = this;
        var fields = ['id', 'title', 'catId', 'snippet', 'date', 'imgUrl', 'location', 'baseLocation', 'text'];
        var fieldsToEncode = ['title', 'snippet', 'location', 'baseLocation', 'text'];
        if (params) { root.init(params); }

        var articleData = helper.filterProperties(root, fields);
        var articleDataEncoded = this.encodeArticleData(articleData, fieldsToEncode);
        var articleDataToDb = helper.propertiesToDBDataset(articleDataEncoded);
        var query = 'UPDATE news SET ' + articleDataToDb + ' WHERE id="' + root.id + '" LIMIT 1';

        return new Promise(function(resolve, reject) {
            db.getConnection(function(err, connection) {
                connection.query(query, function(err, results, query, connection) {
                    if (err) {
                        reject('error');
                    } else {
                        connection.release();
                        resolve(results);
                    }
                })
            });
        })
    }

    remove() {
        var root = this;
        var query = 'DELETE FROM news WHERE id="' + root.id + '"';

        return new Promise(function(resolve, reject) {
            db.getConnection(function(err, connection) {
                connection.query(query, function(err, results, query, connection) {
                    if (err) {
                        reject('error');
                    } else {
                        connection.release();
                        resolve(results);
                    }
                })
            });
        })
    }

    encodeArticleData(articleData, fieldsToEncode) {
        _.each(fieldsToEncode, function(elem) {
            if (articleData[elem]) {
                articleData[elem] =  helper.safeQuery(articleData[elem]);
            }
        });

        if (articleData.date) {
            articleData.date = helper.encodeDateToDb(articleData.date);
        }

        return articleData;
    }

    decodeArticleData(articleData, fieldsToDecode) {
        _.each(fieldsToDecode, function(elem) {
            if (articleData[elem]) {
                articleData[elem] =  helper.decodeSafeQuery(articleData[elem]);
            }
        });

        if (articleData.date) {
            articleData.date = new Date(articleData.date);
        }

        return articleData;
    }
}


module.exports = Article;

