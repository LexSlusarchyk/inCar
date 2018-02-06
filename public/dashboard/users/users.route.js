(function(){
    'use strict';

    angular
        .module('lnd')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('dashboard.users', {
                    url:'/users',
                    templateUrl: 'dashboard/users/users.html',
                    controller: 'DashboardUsersController',
                    controllerAs: 'vm'
                })
        }])
})();