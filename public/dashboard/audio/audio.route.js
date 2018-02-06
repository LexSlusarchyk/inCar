(function(){
    'use strict';

    angular
        .module('lnd')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('dashboard.ads', {
                    url:'/ads',
                    templateUrl: 'dashboard/audio/audio.html',
                    controller: 'DashboardAdsController',
                    controllerAs: 'vm'
                })
        }])
})();
