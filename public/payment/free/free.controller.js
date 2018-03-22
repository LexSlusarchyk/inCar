(function () {
    'use strict';
    angular
        .module('lnd')
        .controller('FreeController', FreeController)

    FreeController.$inject = ['$stateParams', '$state', 'eventsService', 'paymentService', 'usersService'];

    function FreeController($stateParams, $state, eventsService, paymentService, usersService) {
        var vm = this;
        var ticketId = parseInt($stateParams.ticketId);


        vm.tryOut = tryOut;

        eventsService.getTicket(ticketId).then(function(data) {
            vm.ticket = data.data;

            eventsService.getEvent(vm.ticket.eventId).then(function(data) {
                vm.event = data.data;
            });
        });

        function tryOut() {

            paymentService.createFreeTransaction({
                amount: vm.ticket.price,
                eventId: vm.event.id,
                eventName: vm.event.name,
                ticketId: vm.ticket.id,
                userId: usersService.data.userData.id,
                userEmail: usersService.data.userData.email
            })
                .catch(function(err) {
                    alert('We weren\'t able to register you!');
                })
                .then(function(data) {
                    if (data) {
                        alert('Success!');
                        $state.go('tickets');
                    }
                });

        }

    }
})();