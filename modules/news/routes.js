'use strict';

const app = alias.require('@root/app').app,
    newsController = require('./controllers/newsController');

app.get('/api/news', newsController.getAllNews);
app.get('/api/news/last', newsController.getLastNews);
app.get('/api/news/:id', newsController.getArticle);
app.get('/api/news/category/:id', newsController.getNewsByCatId);
app.post('/api/news', newsController.createArticle);
app.put('/api/news/:id', newsController.editArticle);
app.delete('/api/news/:id', newsController.deleteArticle);

app.get('/api/newscategories', newsController.getCategories);
app.post('/api/newscategories', newsController.createCategory);
app.put('/api/newscategories/:id', newsController.editCategory);
app.delete('/api/newscategories/:id', newsController.deleteCategory);

