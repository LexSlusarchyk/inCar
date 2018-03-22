(function(){
    'use strict';

    angular
        .module('lnd')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('payment.free', {
                    url:'/free',
                    templateUrl: 'payment/free/free.html',
                    controller: 'FreeController',
                    controllerAs: 'vm'
                })
        }])
})();