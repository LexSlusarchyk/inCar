'use strict';

const app = alias.require('@root/app'),
    shortid = require('shortid'),
    fileSystem = require("fs"),
    Promise = require('bluebird');

module.exports = {
    getTree: getTree,
    getById: getById,
    addLocation: addLocation,
    updateLocation: updateLocation,
    removeLocation: removeLocation
};

function addLocation (req, res) {
    req.getConnection(function(err, connection) {
        if (err) return res.sendStatus(500);
        var query = 'INSERT INTO geography (name, parent) VALUES("' + req.body.name + '" , "' + req.body.parent + '")';
        connection.query(query, function(err, results) {
            if (err) return res.sendStatus(500);
            res.sendStatus(200);
        })
    })
}

function getById(req, res) {
    req.getConnection(function(err, connection) {
        if (err) return res.sendStatus(500);
        var query = 'SELECT * FROM geography WHERE id="' + req.params.id + '"';
        connection.query(query, function(err, results) {
            if (err) return res.sendStatus(500);
            res.send(results[0]);
        })
    });
}

function updateLocation(req, res) {
    req.getConnection(function(err, connection) {
        if (err) return res.sendStatus(500);
        var query = 'UPDATE geography SET name="' + req.body.name + '", parent="' + req.body.parent + '" WHERE id="' + req.params.id + '"';
        connection.query(query, function(err, results) {
            if (err) return res.sendStatus(500);
            res.sendStatus(200);
        })
    });
}


function removeLocation(req, res) {
    req.getConnection(function(err, connection) {
        var query = 'DELETE FROM geography WHERE id="' + req.params.id + '"';
        connection.query(query, function(err, results) {
            if (err) return res.sendStatus(500);
            res.sendStatus(200);
        })
    })
}


function getTree(req, res) {
    req.getConnection(function(err, connection) {
        if (err) return res.send(err);
        var query = "Select * FROM geography";
        connection.query(query, function(err, results){
            if (err) return res.send(err);
            var tree = [];
            formTree();
            res.send(tree);

            function formTree(parent, subcatsToPush) {
                var sourceId = getSourceId(results);

                if (!parent) {
                    var sourceChildren = getChildren(sourceId, results);
                    tree = tree.concat(sourceChildren);
                    for (var i = 0; i < tree.length; i++) {
                        var children = getChildren(tree[i].id, results);
                        if (children) {
                            formTree(tree[i], children);
                        }
                    }
                } else {
                    parent.children = subcatsToPush;
                    for (var j = 0; j < parent.children.length; j++) {
                        var children = getChildren(parent.children[j].id, results);
                        if (children) {
                            formTree(parent.children[j], children);
                        }
                    }
                }
            }
        })
    })
}


function getChildren(parentId, data) {
    var children = [];
    for (var m = 0; m < data.length; m++) {
        if (parseInt(data[m].parent) === parseInt(parentId)) {
            children.push(data[m]);
        }
    }
    return children.length ? children : false;
}

function getSourceId(data) {
    for (var k = 0; k < data.length; k++) {
        if (!parseInt(data[k].parent)) {
            return data[k].id
        }
    }
}

function getSourceCats(data) {
    var sourceId = getSourceId(data);
    var children = [];
    for (var m = 0; m < data.length; m++) {
        if (data[m].parent === sourceId) {
            children.push(data[m]);
        }
    }
    return children
}