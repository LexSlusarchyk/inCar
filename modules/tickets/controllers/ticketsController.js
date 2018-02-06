'use strict';

const app = alias.require('@root/app'),
	shortid = require('shortid'),
	fileSystem = require("fs"),
    Promise = require('bluebird'),
    Ticket = require('../../events/models/Ticket'),
    helper = alias.require('@root/helper');

module.exports = {
    getUserTickets,
	getBoughtTickets,
	getBoughtTicketsByEventId
};

function getUserTickets(req, res) {
    var query = 'SELECT * FROM boughttickets WHERE userId="' + req.params.userId + '"';

    req.getConnection(function(err, connection) {
    	if (err) return res.sendStatus(500);
    	connection.query(query, function(err, results){
    		if (err) return res.sendStatus(500);
    		var ticketIds = helper.resultsFieldToString(results, 'ticketId', ',');

    		if (!ticketIds) {
    			return res.send([]);
    		}

    		var usersTicketsQuery = 'SELECT * FROM tickets WHERE id IN (' + ticketIds +  ')'
    		connection.query(usersTicketsQuery, function(err, results) {
    			if (err) return res.sendStatus(500);
    			return res.send(results);
    		})
    	});
    })
   
}

function getBoughtTickets(req, res) {
	var query = 'SELECT * FROM boughttickets ORDER BY id DESC';

	req.getConnection(function(err, connection) {
		if (err) {return res.sendStatus(500);}
		connection.query(query, function(err, results){
			if (err) {return res.sendStatus(500);}
			return res.send(results);
		});
	})
}

function getBoughtTicketsByEventId(req, res) {
	var query = 'SELECT * FROM boughttickets WHERE eventId="' + req.params.eventId + '" ORDER BY id DESC';

	req.getConnection(function(err, connection) {
		if (err) {return res.sendStatus(500);}
		connection.query(query, function(err, results){
			if (err) {return res.sendStatus(500);}
			return res.send(results);
		});
	})
}

function getEvent(req, res) {
	var query = 'SELECT * FROM events WHERE id="' + req.params.id + '"';
	var ticketsQuery = 'SELECT * FROM tickets WHERE eventId="' + req.params.id + '"';
	req.getConnection(function(err, connection) {
		if (err) return res.send(err);
		connection.query(query, function(err, results){
			if (err) return res.sendStatus(500);
			if (results[0]) {
				results[0].date = new Date(results[0].date);
				connection.query(ticketsQuery, function(ticketErr, ticketsResults) {
					results[0].tickets = ticketsResults;
					res.send(results[0])
				})
			} else {
				res.sendStatus(404);
			}
		})
	})
}











