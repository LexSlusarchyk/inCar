(function(){
    'use strict';

    angular
        .module('lnd')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('dashboard.subscriptions', {
                    url:'/subscriptions',
                    templateUrl: 'dashboard/subscriptions/subscriptions.html',
                    controller: 'DashboardSubscriptionsController',
                    controllerAs: 'vm'
                })
        }])
})();