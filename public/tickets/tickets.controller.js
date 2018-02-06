(function () {
    'use strict';

    angular
        .module('lnd')
        .controller('TicketsController', TicketsController);

    TicketsController.$inject = ['$scope', '$stateParams', '$http', 'usersService', 'eventsService'];
    /* @ngInject */
    function TicketsController($scope, $stateParams, $http, usersService, eventsService) {
        var vm = this;
        vm.userId = usersService.data.userData.id;

        eventsService.getUserTickets(vm.userId).then(function(response){
            vm.tickets = response.data;
        })
     
    }
})();