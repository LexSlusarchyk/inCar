(function () {
    'use strict';

    angular
        .module('lnd')
        .controller('CreateTicketModalController', CreateTicketModalController);


    CreateTicketModalController.$inject = ['$scope', 'eventId', 'modalService', 'eventsService'];
   
    function CreateTicketModalController($scope, eventId, modalService, eventsService) {
        var vm = this;
        vm.ticket = {};
        vm.ticket.eventId = eventId;
        vm.manageTicket = addTicket;
        
        function addTicket(ticket) {
            modalService.confirmTicketCreation(ticket);
        }
    }

})();