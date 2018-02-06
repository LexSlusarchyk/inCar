'use strict';

const app = alias.require('@root/app').app,
    categoriesController = require('./controllers/categoriesController');

app.get('/api/cats', categoriesController.getList);
app.get('/api/cats/:id', categoriesController.getCat);
app.get('/api/catstree', categoriesController.getTree);
app.post('/api/cats', categoriesController.addCat);
app.put('/api/cats/:id', categoriesController.updateCat);
app.delete('/api/cats/:id', categoriesController.removeCat);