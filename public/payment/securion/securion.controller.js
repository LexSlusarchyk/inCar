(function () {
    'use strict';
    angular
        .module('lnd')
        .controller('SecurionController', SecurionController);

    SecurionController.$inject = ['$stateParams', '$state', 'eventsService', 'paymentService', 'usersService'];

    function SecurionController($stateParams, $state, eventsService, paymentService, usersService) {
        var vm = this;
        var ticketId = parseInt($stateParams.ticketId);

        activate();

        function activate() {
            setPublicKey();
            getTicket();
        }

        function setPublicKey() {
            Securionpay.setPublicKey('pk_test_Hw4RbkVQBI231nOVdxwH4cWg');
        }

        function getTicket() {
            eventsService.getTicket(ticketId).then(function(data) {
                vm.ticket = data.data;

                eventsService.getEvent(vm.ticket.eventId).then(function(data) {
                    vm.event = data.data;
                });
            });
        }

        function createCardTokenCallback(token) {
            var paymentOptions;
            var form = $('#payment-form');
            if (token.error) {
                form.find('.payment-errors').text(token.error.message);
                form.find('button').prop('disabled', false);
            } else {
                paymentOptions = {
                    amount: vm.ticket.price * 100,
                    description: 'Purchase ticket for ' + vm.ticket.name,
                    cardOptions: token,
                    ticketId: vm.ticket.id,
                    eventName: vm.event.name,
                    userId: usersService.data.userData.id
                };

                paymentService.createSecurionTransaction(paymentOptions).then(function(response) {
                    if (response.success) {
                        $state.go('tickets');
                    } else {
                        alert(response.error.message)
                    }
                });
            }
        }

        $('#payment-form').submit(function(e) {
            var form = $('#payment-form');
            form.find('button').prop('disabled', true);
            Securionpay.createCardToken(form, createCardTokenCallback);
            return false;
        });
    }
})();