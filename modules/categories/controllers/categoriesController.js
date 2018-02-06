'use strict';

const app = alias.require('@root/app'),
    helper = require('../../../helper');

module.exports = {
    addCat: addCat,
    getCat: getCat,
    updateCat: updateCat,
    removeCat: removeCat,
    getList: getList,
    getTree: getTree
};

function addCat(req, res) {
    req.getConnection(function(err, connection) {
        if (err) return res.sendStatus(500);
        var query = 'INSERT INTO categories (name, parent) VALUES("' + req.body.name + '" , "' + req.body.parent + '")';
        connection.query(query, function(err, results) {
            if (err) return res.sendStatus(500);
            res.sendStatus(200);
        })
    })
}

function getCat(req, res) {
    req.getConnection(function(err, connection) {
        if (err) return res.sendStatus(500);
        var query = 'SELECT * FROM categories WHERE id="' + req.params.id + '"';
        connection.query(query, function(err, results) {
            if (err) return res.sendStatus(500);
            res.send(results[0]);
        })
    })
}

function updateCat(req, res) {
    req.getConnection(function(err, connection) {
        if (err) return res.sendStatus(500);
        var query = 'UPDATE categories SET name="' + req.body.name + '", parent="' + req.body.parent + '" WHERE id="' + req.params.id + '"';
        connection.query(query, function(err, results) {
            if (err) return res.sendStatus(500);
            res.sendStatus(200);
        })
    });
}

function removeCat(req, res) {
    req.getConnection(function(err, connection) {
        var query = 'DELETE FROM categories WHERE id="' + req.params.id + '"';
        connection.query(query, function(err, results) {
            if (err) return res.sendStatus(500);
            res.sendStatus(200);
        })
    })
}

function getList(req, res) {
    req.getConnection(function(err, connection) {
        if (err) return res.sendStatus(500);
        var query = "Select * FROM categories";
        connection.query(query, function(err, results){
            if (err) return res.sendStatus(500);
            var sourceCats = getSourceCats(results);
            var catsList = [];

            for (var i = 0; i < sourceCats.length; i++) {
                pushCat(sourceCats[i], 0);
            }

            return res.send(catsList);

            function pushCat(catToPush, deepness) {
                var children;
                catToPush.deepness = deepness;
                catsList.push(catToPush);
                children = getChildren(catToPush.id, results);

                if (children) {
                    catToPush.hasChildren = true;
                    for (var k = 0; k < children.length; k++) {
                        pushCat(children[k], deepness + 1)
                    }
                }
            }
        })
    })
}

function getTree(req, res) {
    req.getConnection(function(err, connection) {
        if (err) return res.send(err);
        var query = "Select * FROM categories";
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
                    parent.subcats = subcatsToPush;
                    for (var j = 0; j < parent.subcats.length; j++) {
                        var children = getChildren(parent.subcats[j].id, results);
                        if (children) {
                            formTree(parent.subcats[j], children);
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
      if (data[m].parent === parentId) {
        children.push(data[m]);
      }
    }
    return children.length ? children : false;
}

function getSourceId(data) {
  for (var k = 0; k < data.length; k++) {
    if (!data[k].parent) {
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