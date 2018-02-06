'use strict';

const app = alias.require('@root/app').app,
    rolesController = require('./controllers/rolesController');

app.get('/api/roles/list', rolesController.getList);