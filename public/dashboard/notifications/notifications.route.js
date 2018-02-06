(function(){
    'use strict';

    angular
        .module('lnd')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('dashboard.notifications', {
                    url:'/notifications',
                    templateUrl: 'dashboard/notifications/notifications.html',
                    controller: 'DashboardNotificationsController',
                    controllerAs: 'vm'
                })
        }])
})();
