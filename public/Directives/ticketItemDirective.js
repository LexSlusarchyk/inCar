(function () {
    'use strict';

    angular
        .module('lnd')
        .directive('ticketItem', ticketItem);

    ticketItem.$inject = [];
    /* @ngInject */
    function ticketItem() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: TicketItemController,
            controllerAs: 'vm',
            restrict: 'E',
            templateUrl: 'templates/ticket-item.html',
            scope: {
                ticket: '=',
                index: '='
            }
        };

        return directive;
    }

    TicketItemController.$inject = ['$rootScope', '$scope', '$element', '$uibModal', 'eventsService', 'confirmService'];
    /* @ngInject */
    function TicketItemController($rootScope, $scope, $element, $uibModal, eventsService, confirmService) {
        var vm = this;
        vm.removeTicket = removeTicket;

        function removeTicket() {
            $scope.$parent.vm.removeTicket(vm.index);
        }
    }
})();

