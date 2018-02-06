(function () {
    'use strict';
    angular
        .module('lnd')
        .controller('DashboardUsersController', DashboardUsersController);

    DashboardUsersController.$inject = ['usersService'];

    function DashboardUsersController(usersService) {
        var vm = this;

        vm.filter = filter;

        activate();

        function activate() {
            getUsers();
        }


        function getUsers() {
            usersService.getUsersList().then(function(response) {
                vm.users = response.data;
            })
        }

        function filter(actual) {
            if (vm.userSearch) {
                return actual.email.includes(vm.userSearch);
            }
            return true;
        }

    }
})();


