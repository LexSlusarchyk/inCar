'use strict';

const app = alias.require('@root/app').app,
    paymentController = require('./controllers/paymentController');

app.get('/api/payment/client-token', paymentController.getClientToken);
app.post('/api/payment/pay', paymentController.createTransaction);
app.post('/api/payment/securion', paymentController.securionTransaction);
app.post('/api/payment/pokupo-reserve', paymentController.pokupoReserve);
app.post('/pokupo-confirm', paymentController.pokupoConfirm);

