(function(){
    'use strict';

    angular
        .module('lnd')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('payment.pokupo', {
                    url:'/pokupo',
                    templateUrl: 'payment/pokupo/pokupo.html',
                    controller: 'PokupoController',
                    controllerAs: 'vm'
                })
        }])
})();