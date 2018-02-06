'use strict';

const app = alias.require('@root/app'),
	braintree = require("braintree"),
    Promise = require('bluebird'),
    Ticket = require('../../events/models/Ticket'),
    helper = alias.require('@root/helper'),
    uuid = require('uuid/v1'),
    securion = require('securionpay')('sk_test_qcUjwksuIjuHHnHiA3nwFBZc');


//var gateway = braintree.connect({
//    environment:  braintree.Environment.Sandbox,
//    merchantId:   '8rmrg4ch7332cmnk',
//    publicKey:    '435wsf9sbpf29s83',
//    privateKey:   '16ea53e1bc3068d0b7a3f160c312d6e1'
//});

var gateway = braintree.connect({
    environment:  braintree.Environment.Production,
    merchantId:   'npy5vwpzb33chbkt',
    publicKey:    'vwm3wm66hgngtxst',
    privateKey:   '617db79beaf4c056c461e9b011ab28b1'
});

module.exports = {
    getClientToken,
    createTransaction,
    securionTransaction,
    pokupoReserve,
    pokupoConfirm
};

function getClientToken (req, res) {
    if (!gateway) { return false; }
	gateway.clientToken.generate({}, function (err, response) {
		res.send(response.clientToken);
	});
}

function createTransaction(req, res) {
    gateway.transaction.sale({
      amount: req.body.amount,
      paymentMethodNonce: req.body.nonce,
      options: {
        submitForSettlement: true
      }
    }, function (err, result) {
        if (err || result.success === false) {
            console.log(result);
            return res.sendStatus(500);
        } else {
            var ticket = new Ticket({id: req.body.ticketId});
            ticket.load()
                .then(function(lolka) {
                    ticket
                        .buy(req.body.userId, req.body.eventName, req.body.eventId).then(function(data){
                            res.send({success: true})
                        })
                        .catch(function (err) {
                            return res.send(err);
                        });
                })
                .catch(function (err) {
                    return res.send(err);
                });
        }
    });
}

function securionTransaction(req, res) {
    securion.charges.create({
        amount: req.body.amount,
        currency: "USD",
        description: req.body.description,
        card: req.body.cardOptions
    })
    .then(function(response) {
        var ticket = new Ticket({id: req.body.ticketId});
        ticket.load()
            .then(function(lolka) {
                ticket
                    .buy(req.body.userId, req.body.eventName, req.body.eventId)
                        .then(function(data) {
                            return res.send({
                                success: true,
                                data: response
                            });
                        })
                        .catch(function(error) {
                            return res.send({
                                success: false,
                                error: error
                            });
                        });
            })
            .catch(function(error) {
                return res.send({
                    success: false,
                    error: error
                });
            });
    })
    .catch(function(error) {
        return res.send({
            success: false,
            error: error
        });
    });
}

function pokupoReserve(req, res) {
    var userID = req.body.userId;
    var ticketId = req.body.ticketId;
    var token = uuid();

    var ticket = new Ticket({id: ticketId});

    ticket.reserve(userID, token)
        .then(function() {
            return res.send({
                success: true,
                token: token
            });
        })
        .catch(function(error) {
            console.log(error);
            return res.send({
                success: false,
                error: error
            });
        });
}


function pokupoConfirm(req, res) {
    var token = req.body['LMI_PAYMENT_NO'];
    var ticket = new Ticket({});

    var userId, ticketId, activationId;

    ticket.loadReserved(token)
        .then(function(response) {
            userId = response.userId;
            ticketId = response.ticketId;
            activationId = response.id;

            if (!response) {
                return res.send('No reserved ticket!');
            }

            var reservedTicket = new Ticket({id: ticketId});

            reservedTicket.load()
                .then(function() {
                    reservedTicket
                        .buy(userId, reservedTicket.eventName, reservedTicket.eventId)
                        .then(function(data) {
                            var activateQuery = 'UPDATE reservedTickets SET isActivated="1" WHERE id="' + activationId + '"';

                            req.getConnection(function(err, connection) {
                                if (err) return res.sendStatus(500);
                                connection.query(activateQuery, function(err, results) {
                                    if (err) return res.sendStatus(500);
                                    return res.send({
                                        success: true,
                                        data: data
                                    });
                                })
                            });


                        })
                        .catch(function(error) {
                            return res.send({
                                success: false,
                                error: error
                            });
                        });
                })
                .catch(function(error) {
                    return res.send({
                        success: false,
                        error: error
                    });
                });
        })
        .catch(function(error) {
            return res.send({
                success: false,
                error: error
            });
        });




    //var ticket = new Ticket({id: req.body.ticketId});
    //ticket.load()
    //    .then(function(lolka) {
    //        ticket
    //            .buy(req.body.userId, req.body.eventName, req.body.eventId)
    //            .then(function(data) {
    //                return res.send({
    //                    success: true,
    //                    data: response
    //                });
    //            })
    //            .catch(function(error) {
    //                return res.send({
    //                    success: false,
    //                    error: error
    //                });
    //            });
    //    })
    //    .catch(function(error) {
    //        return res.send({
    //            success: false,
    //            error: error
    //        });
    //    });
}