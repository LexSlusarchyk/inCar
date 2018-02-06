'use strict';

const app = alias.require('@root/app').app,
    geographyController = require('./controllers/geographyController');

app.get('/api/geography/locations', geographyController.getTree);
app.get('/api/geography/locations/:id', geographyController.getById);
app.post('/api/geography/locations', geographyController.addLocation);
app.put('/api/geography/locations/:id', geographyController.updateLocation);
app.delete('/api/geography/locations/:id', geographyController.removeLocation);

