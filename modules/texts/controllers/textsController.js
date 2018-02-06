'use strict';

const app = alias.require('@root/app'),

    helper = alias.require('@root/helper');

module.exports = {
    getText: getText,
    updateText: updateText
};

function getText(req, res) {
    var query = 'SELECT * FROM texts WHERE type="' + req.params.type + '" ORDER BY ID DESC LIMIT 1';

    req.getConnection(function(err, connection) {
        if (err) return res.send(err);
        connection.query(query, function(err, results){
            if (err) return res.send(err);
            var textData = results[0];
            textData.markup = helper.decodeSafeQuery(textData.markup);
            res.send(textData);
        })
    })
}

function updateText(req, res) {
    var safeMarkup = helper.safeQuery(req.body.markup);
    req.getConnection(function(err, connection) {
        if (err) return res.sendStatus(500);
        var query = 'INSERT INTO texts (type, markup) VALUES("' + req.body.type + '" , "' + safeMarkup + '")';
        connection.query(query, function(err, results) {
            if (err) return res.send(err);
            res.sendStatus(200);
        })
    })
}
