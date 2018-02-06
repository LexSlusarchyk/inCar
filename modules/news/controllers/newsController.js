'use strict';

const app = alias.require('@root/app'),
    shortid = require('shortid'),
    fileSystem = require("fs"),
    Promise = require('bluebird'),
    Article = require('../models/Article'),
    helper = alias.require('@root/helper');

module.exports = {
    getAllNews: getAllNews,
    getLastNews: getLastNews,
    getNewsByCatId: getNewsByCatId,
    getArticle: getArticle,
    createArticle: createArticle,
    editArticle: editArticle,
    deleteArticle: deleteArticle,
    getCategories: getCategories,
    createCategory: createCategory,
    editCategory: editCategory,
    deleteCategory: deleteCategory
};

function getAllNews(req, res) {
    var query = "Select * FROM news ORDER BY id DESC";

    req.getConnection(function(err, connection) {
        if (err) return res.send(err);
        connection.query(query, function(err, results){
            if (err) return res.send(err);
            res.send(results);
        })
    })
}

function getLastNews(req, res) {
    var query = 'Select * FROM news ORDER BY id DESC LIMIT 3';

    req.getConnection(function(err, connection) {
        if (err) return res.send(err);
        connection.query(query, function(err, results){
            if (err) return res.send(err);
            res.send(results);
        })
    })
}

function getNewsByCatId(req, res) {
    var query = 'Select * FROM news WHERE catId="' + req.params.catId + '" ORDER BY id DESC';

    req.getConnection(function(err, connection) {
        if (err) return res.send(err);
        connection.query(query, function(err, results){
            if (err) return res.sendStatus(500);
            res.send(results);
        })
    })
}

function getArticle(req, res) {
    var article = new Article({id: req.params.id});
    article.load()
        .then(function(response) {
            res.send(article);
        })
        .catch(function (err) {
            res.send(err);
        });
}

function createArticle(req, res) {
    var article = new Article(req.body);
    article.create().then(function(response) {
        return res.send(response);
    }).catch(function (err) {
        res.send(err);
    });
}

function editArticle(req, res) {
    var article = new Article({id: req.params.id});
    article.load().then(function(response, err) {
        console.log(article);
        article.edit(req.body).then(function(response){
            return res.send(response);
        });
    });
}

function deleteArticle(req, res) {
    var article = new Article({id: req.params.id});
    article.remove().then(function(response) {
        return res.send(response);
    })
}


function getCategories(req, res) {
    var query = "Select * FROM newscats";

    req.getConnection(function(err, connection) {
        if (err) return res.send(err);
        connection.query(query, function(err, results){
            if (err) return res.sendStatus(500);
            res.send(results);
        })
    })
}

function createCategory(req, res) {
    var catDataToDb = helper.propertiesToDBDataset(req.body);
    var query = 'INSERT INTO newscats SET ' + catDataToDb;
    req.getConnection(function(err, connection) {
        if (err) return res.send(err);
        connection.query(query, function(err, results){
            if (err) return res.sendStatus(500);
            res.send(results);
        })
    })
}

function editCategory(req, res) {
    var catDataToDb = helper.propertiesToDBDataset(req.body);
    var query = 'UPDATE newscats SET ' + catDataToDb + ' WHERE id="' + req.params.id + '" LIMIT 1';

    req.getConnection(function(err, connection) {
        if (err) return res.send(err);
        connection.query(query, function(err, results){
            if (err) return res.sendStatus(500);
            res.send(results);
        })
    })
}

function deleteCategory(req, res) {
    var query = 'DELETE FROM newscats WHERE id="' + req.params.id + '"';

    req.getConnection(function(err, connection) {
        if (err) return res.send(err);
        connection.query(query, function(err, results){
            if (err) return res.sendStatus(500);
            res.send(results);
        })
    })
}






