'use strict';

const app = alias.require('@root/app').app,
    eventsController = require('./controllers/eventsController');

app.get('/api/events/list', eventsController.getAllEvents);
app.get('/api/events/last', eventsController.getLastEvents);
app.get('/api/events/:id', eventsController.getEvent);
app.get('/api/events/category/:id', eventsController.getEventsByCatId);
app.post('/api/events', eventsController.createEvent);
app.put('/api/events/:id', eventsController.updateEvent);
app.delete('/api/events/:id', eventsController.deleteEvent);

app.get('/api/events/tickets/:eventId', eventsController.getTickets);
app.get('/api/events/tickets/ticket/:ticketId', eventsController.getTicket);
app.post('/api/events/tickets', eventsController.createTicket);
app.put('/api/events/tickets/:id', eventsController.updateTicket);
app.delete('/api/events/tickets/:id', eventsController.deleteTicket);

