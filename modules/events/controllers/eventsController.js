'use strict';

const app = alias.require('@root/app'),
	shortid = require('shortid'),
	fileSystem = require("fs"),
    Promise = require('bluebird'),
    helper = alias.require('@root/helper');

module.exports = {
    getAllEvents,
	getLastEvents,
    getFixedEvents,
    getEvent,
    getEventsByCatId,
    createEvent,
    updateEvent,
    fixEvent,
    deleteEvent,
    createTicket,
    getTickets,
    getTicket,
    updateTicket,
    deleteTicket
};

function getAllEvents(req, res) {
	var date = 'WHERE date >= DATE_ADD(CURDATE(), INTERVAL -10 DAY)';
	var query = "Select * FROM events ORDER BY id DESC";
	req.getConnection(function(err, connection) {
		if (err) return res.send(err);
		connection.query(query, function(err, results){
			if (err) return res.sendStatus(500);
			res.send(results);
		})
	})
}

function getLastEvents(req, res) {
	var date = 'WHERE date >= CURDATE()';
	var query = 'Select * FROM events ORDER BY id DESC LIMIT 6';
	req.getConnection(function(err, connection) {
		if (err) return res.send(err);
		connection.query(query, function(err, results){
			if (err) return res.sendStatus(500);
			res.send(results);
		})
	})
}

function getFixedEvents(req, res) {
    var query = 'Select * FROM events WHERE isFixed="1"';
    req.getConnection(function(err, connection) {
        if (err) return res.send(err);
        connection.query(query, function(err, results){
            if (err) return res.sendStatus(500);
            res.send(results);
        })
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

function getEventsByCatId(req, res) {
	var date = 'AND DATE_ADD(CURDATE(), INTERVAL -10 DAY)';
	var query = 'SELECT * FROM events WHERE catId="' + req.params.id + '" ORDER BY id DESC';
	req.getConnection(function(err, connection) {
		if (err) return res.send(err);
		connection.query(query, function(err, results){
			if (err) return res.sendStatus(500);
			console.log(results);
			res.send(results);
		})
	})
}

function createEvent(req, res) {
	var eventData = mapEventToDb(req.body);
	var eventDataToDb = helper.propertiesToDBDataset(eventData);
	var query = 'INSERT INTO events SET ' + eventDataToDb;
	req.getConnection(function(err, connection) {
		if (err) return res.send(err);
		connection.query(query, function(err, results){
			if (err) return res.send(err);
			res.send(results);
		})
	})
}

function updateEvent(req, res) {
	var eventData = mapEventToDb(req.body);
	var eventDataToDb = helper.propertiesToDBDataset(eventData);
	var query = 'UPDATE events SET ' + eventDataToDb + ' WHERE id="' + req.params.id + '" LIMIT 1';

	req.getConnection(function(err, connection) {
		if (err) return res.send(err);
		connection.query(query, function(err, results){
			if (err) return res.send(err);
			res.send(results);
		})
	})
}

function fixEvent(req, res) {
	var isFixed = +!req.body.isFixed;
    var query = 'UPDATE events SET isFixed = "' + isFixed + '" WHERE id="' + req.body.id + '" LIMIT 1';

    req.getConnection(function(err, connection) {
        if (err) return res.send(err);
        connection.query(query, function(err, results){
            if (err) return res.send(err);
            res.send(results);
        })
    })
}

function deleteEvent(req, res) {
	var query = 'DELETE FROM events WHERE id="' + req.params.id + '"';
	req.getConnection(function(err, connection) {
		if (err) return res.send(err);
		connection.query(query, function(err, results){
			if (err) return res.sendStatus(500);
			res.send(results);
		})
	})
}

function createTicket(req, res) {
	var ticketData = helper.propertiesToDBDataset(req.body);
	var query = 'INSERT INTO tickets SET ' + ticketData;

	req.getConnection(function(err, connection) {
		if (err) return res.send(err);
		connection.query(query, function(err, results){
			if (err) return res.send(err);
			var queryTicket = 'SELECT * FROM tickets WHERE id="' + results.insertId + '"';
			connection.query(queryTicket, function(err, results){
				res.send(results[0]);
			})
			
		})
	})
}

function getTicket(req, res) {
	var query = 'SELECT * FROM tickets WHERE id="' + req.params.ticketId + '"';
	req.getConnection(function(err, connection) {
		if (err) return res.send(err);
		connection.query(query, function(err, results){
			if (err) return res.sendStatus(500);
			res.send(results[0]);
		})
	})
}

function getTickets(req, res) {
	var query = 'SELECT * FROM events WHERE id="' + req.params.eventId + '"';
}

function updateTicket(req, res) {

}

function deleteTicket(req, res) {
	var query = 'DELETE FROM tickets WHERE id="' + req.params.id + '"';
	req.getConnection(function(err, connection) {
		if (err) return res.send(err);
		connection.query(query, function(err, results){
			if (err) return res.sendStatus(500);
			res.send(results);
		})
	})
}

function mapEventToDb(eventDataset) {
	if (eventDataset.id) {
		delete eventDataset.id;
	}

	if (eventDataset.tickets) {
		delete eventDataset.tickets;
	}

	if (!eventDataset.imageUrl) {
		delete eventDataset.imageUrl;
	}

	if (!eventDataset.version) {
		delete eventDataset.version;
	}

	if (eventDataset.date) {
		eventDataset.time = getTime(eventDataset.date);
		eventDataset.date = helper.encodeDateToDb(eventDataset.date);
	}

	if (eventDataset.text) {
		eventDataset.text = helper.safeQuery(eventDataset.text);
	}
	
	return eventDataset;
}

function getTime(dateString) {
	var date = new Date(dateString);
	var hours = date.getHours();
	var minutes = date.getMinutes();
	return hours + ':' + minutes;
}










