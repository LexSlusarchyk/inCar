'use strict';

const app = alias.require('@root/app').app,
    textsController = require('./controllers/textsController');

app.get('/api/texts/:type', textsController.getText);
app.post('/api/texts', textsController.updateText);

