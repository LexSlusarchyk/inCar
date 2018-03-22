(function () {
    'use strict';
    angular
        .module('lnd')
        .controller('PayPalController', PayPalController)

    PayPalController.$inject = ['$stateParams', '$state', 'eventsService', 'paymentService', 'usersService'];

    function PayPalController($stateParams, $state, eventsService, paymentService, usersService) {
        var vm = this;
        var ticketId = parseInt($stateParams.ticketId);
        var hostedFieldsInstance;

        vm.tryOut = tryOut;

        eventsService.getTicket(ticketId).then(function(data) {
            vm.ticket = data.data;

            eventsService.getEvent(vm.ticket.eventId).then(function(data) {
                vm.event = data.data;

                paymentService.getBraintreeClient().then(function(data) {
                    hostedFieldsInstance = data;
                })
            });
        });

        function tryOut() {
            hostedFieldsInstance.tokenize(function (tokenizeErr, payload) {
                if (tokenizeErr) {
                    switch (tokenizeErr.code) {
                        case 'HOSTED_FIELDS_FIELDS_EMPTY':
                            console.error('All fields are empty! Please fill out the form.');
                            break;
                        case 'HOSTED_FIELDS_FIELDS_INVALID':
                            console.error('Some fields are invalid:', tokenizeErr.details.invalidFieldKeys);
                            break;
                        case 'HOSTED_FIELDS_FAILED_TOKENIZATION':
                            console.error('Tokenization failed server side. Is the card valid?');
                            break;
                        case 'HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR':
                            console.error('Network error occurred when tokenizing.');
                            break;
                        default:
                            console.error('Something bad happened!', tokenizeErr);
                    }
                } else {
                    paymentService.createTransaction({
                        nonce: payload.nonce,
                        amount: vm.ticket.price,
                        eventId: vm.event.id,
                        eventName: vm.event.name,
                        ticketId: vm.ticket.id,
                        userId: usersService.data.userData.id,
                        userEmail: usersService.data.userData.email
                    })
                        .catch(function(err) {
                            alert('We weren\'t able to bill your credit card!');
                        })
                        .then(function(data) {
                            if (data) {
                                alert('Success!');
                                $state.go('tickets');
                            }
                        });
                }
            });
        }

    }
})();