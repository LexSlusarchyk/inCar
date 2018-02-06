'use strict';

const app = alias.require('@root/app').app,
    notificationsController = require('./controllers/notificationsController');

app.get('/api/notifications', notificationsController.getNotifications);
app.get('/api/notifications/:id', notificationsController.getNotification);
app.post('/api/notifications', notificationsController.createNotification);
app.put('/api/notifications/:id', notificationsController.editNotification);
app.delete('/api/notifications/:id', notificationsController.deleteNotification);

