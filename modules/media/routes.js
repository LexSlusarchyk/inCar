'use strict';

const app = alias.require('@root/app').app,
    mediaController = require('./controllers/mediaController');

app.post('/api/media/base64image', mediaController.base64ToS3);

