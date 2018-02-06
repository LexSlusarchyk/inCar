'use strict';

const app = alias.require('@root/app'),
    shortid = require('shortid'),
    fileSystem = require("fs"),
    Promise = require('bluebird'),
    Ad = require('../models/Ad'),
    helper = alias.require('@root/helper');

module.exports = {
    getAds: getAds,
    getSecondaryAds: getSecondaryAds,
    getAdsByCategoryId: getAdsByCategoryId,
    getAd: getAd,
    getMainAd: getMainAd,
    createAd: createAd,
    editAd: editAd,
    deleteAd: deleteAd
};


function getAds(req, res) {
    var query = 'Select * FROM ads';

    req.getConnection(function(err, connection) {
        if (err) return res.send(err);
        connection.query(query, function(err, results){
            if (err) return res.send(err);
            res.send(results);
        })
    })
}

function getSecondaryAds(req, res) {
    var query = 'Select * FROM ads WHERE isMainAd="0"';
    var quantity = req.query.quantity;

    console.log( quantity);

    req.getConnection(function(err, connection) {
        if (err) return res.send(err);
        connection.query(query, function(err, results){
            if (err) return res.send(err);
            res.send(getRandomAds(results, quantity));
        })
    })
}

function getMainAd(req, res) {
    var query = 'Select * FROM ads WHERE isMainAd="1"';

    req.getConnection(function(err, connection) {
        if (err) return res.send(err);
        connection.query(query, function(err, results){
            if (err) return res.send(err);
            console.log(results);
            res.send(getRandomAds(results)[0]);
        })
    })
}

function getAdsByCategoryId(req, res) {
    var query = "Select * FROM ads";

    req.getConnection(function(err, connection) {
        if (err) return res.send(err);
        connection.query(query, function(err, results){
            if (err) return res.send(err);
            res.send(results);
        })
    })
}

function getAd(req, res) {
    var ad = new Ad({id: req.params.id});
    ad.load()
        .then(function(response) {
            res.send(ad);
        })
        .catch(function (err) {
            return res.send(err);
        });
}

function createAd(req, res) {
    var ad = new Ad(req.body);
    ad.create()
        .then(function(response) {
            return res.send(response);
        })
        .catch(function (err) {
            return res.send(err);
        });
}

function editAd(req, res) {
    var ad = new Ad({id: req.params.id});
    ad.load()
        .then(function(response) {
            ad.edit(req.body)
                .then(function(data){
                    return res.send(data);
                })
                .catch((err) => { return res.send(err) });
        })
        .catch((err) => { return res.send(err) });
}

function deleteAd(req, res) {
    var ad = new Ad({id: req.params.id});
    ad.remove()
        .then(function(response) {
            return res.send(response);
        })
        .catch((err) => { return res.send(err) });
}


/// helpers

function getRandomAds(ads, quantity) {
    var result = [];
    var neededQuantity = quantity || 2;

    for (var i = 0; i < neededQuantity; i++) {
        if (ads.length) {
            var winner = ads.splice(Math.round(Math.random() * ads.length - 1), 1);
            result.push(winner[0]);
        }

    }

    return result;
}




