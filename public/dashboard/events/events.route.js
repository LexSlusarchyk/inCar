(function(){
    'use strict';

    angular
        .module('lnd')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('dashboard.events', {
                    url:'/events',
                    templateUrl: 'dashboard/events/events.html',
                    controller: 'DashboardEventsController',
                    controllerAs: 'vm'
                })
        }])
})();


