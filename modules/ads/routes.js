'use strict';

const app = alias.require('@root/app').app,
    adsController = require('./controllers/adsController');

app.get('/api/audio', adsController.getAds);
app.get('/api/audio/secondary/random', adsController.getSecondaryAds);
app.get('/api/audio/category/:id', adsController.getAdsByCategoryId);
app.get('/api/audio/:id', adsController.getAd);
app.get('/api/audio/main/random', adsController.getMainAd);
app.post('/api/audio', adsController.createAd);
app.put('/api/audio/:id', adsController.editAd);
app.delete('/api/audio/:id', adsController.deleteAd);



