(function(){
    'use strict';

    angular
        .module('lnd')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('dashboard.locations', {
                    url:'/locations',
                    templateUrl: 'dashboard/locations/locations.html',
                    controller: 'LocationsController',
                    controllerAs: 'vm'
                })
        }])
})();
