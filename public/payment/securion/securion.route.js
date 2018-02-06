(function(){
    'use strict';

    angular
        .module('lnd')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('payment.securion', {
                    url:'/securion',
                    templateUrl: 'payment/securion/securion.html',
                    controller: 'SecurionController',
                    controllerAs: 'vm'
                })
        }])
})();