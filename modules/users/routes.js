'use strict';

const app = alias.require('@root/app').app,
    usersController = require('./controllers/usersController');

app.post('/api/users/signup', usersController.signUp);
app.post('/api/users/login', usersController.login);
app.get('/api/users/list', usersController.list);
app.get('/api/users/:id', usersController.getUser);
app.get('/api/users/activate/:token', usersController.activate);
app.put('/api/users', usersController.updateUser);

app.post('/api/users/reset', usersController.requestPasswordChange);
app.post('/api/users/password', usersController.setNewPassword);