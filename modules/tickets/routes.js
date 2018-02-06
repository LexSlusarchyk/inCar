'use strict';

const app = alias.require('@root/app').app,
    ticketsController = require('./controllers/ticketsController');

app.get('/api/tickets/:userId', ticketsController.getUserTickets);
app.get('/api/boughttickets', ticketsController.getBoughtTickets);
app.get('/api/boughttickets/:eventId', ticketsController.getBoughtTicketsByEventId);


