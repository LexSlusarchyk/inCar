(function () {
    'use strict';
    angular
        .module('lnd')
        .controller('DashboardSubscriptionsController', DashboardSubscriptionsController);

    DashboardSubscriptionsController.$inject = ['usersService', 'eventsService'];

    function DashboardSubscriptionsController(usersService, eventsService) {
        var vm = this;

        vm.filter = filter;

        activate();

        function activate() {
            getUsers();
            eventsService.getBoughtTickets().then(function(response) {
                vm.subscriptions = response.data;
            });
        }

        function getUsers() {
            usersService.getUsersList().then(function(response) {
                vm.users = response.data;
            })
        }

        function filter(actual) {
            if (vm.userSearch && actual.userEmail && actual.eventName) {
                return actual.userEmail.includes(vm.userSearch) || actual.eventName.includes(vm.userSearch);
            }
            return true;
        }

    }
})();


