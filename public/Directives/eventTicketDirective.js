(function () {
    'use strict';

    angular
        .module('lnd')
        .directive('eventTicket', eventTicket);

    eventTicket.$inject = [];
    /* @ngInject */
    function eventTicket() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: EventTicketController,
            controllerAs: 'vm',
            restrict: 'E',
            templateUrl: 'templates/event-ticket.html',
            scope: {
                ticket: '=',
                index: '='
            }
        };

        return directive;
    }

    EventTicketController.$inject = ['$rootScope', '$scope', '$http', '$element', '$uibModal', 'eventsService', 'confirmService', 'usersService'];
    /* @ngInject */
    function EventTicketController($rootScope, $scope, $http, $element, $uibModal, eventsService, confirmService, usersService) {
        var vm = this;
        vm.removeTicket = removeTicket;
        vm.instance = undefined;

        vm.loggedUser = usersService.data.userData;



        function removeTicket() {
            $scope.$parent.vm.removeTicket(vm.index);
        }
    }
})();

