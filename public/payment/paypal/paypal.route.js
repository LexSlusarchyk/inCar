(function(){
    'use strict';

    angular
        .module('lnd')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('payment.paypal', {
                    url:'/paypal',
                    templateUrl: 'payment/paypal/paypal.html',
                    controller: 'PayPalController',
                    controllerAs: 'vm'
                })
        }])
})();