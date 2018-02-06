(function(){
    'use strict';

    angular
        .module('lnd')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('dashboard.texts', {
                    url:'/texts/:type',
                    templateUrl: 'dashboard/texts/texts.html',
                    controller: 'DashboardTextsController',
                    controllerAs: 'vm'
                })
        }])
})();