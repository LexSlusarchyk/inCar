(function(){
    'use strict';

    angular
        .module('lnd')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('email-confirm', {
                    url:'/confirm-email/:tok',
                    templateUrl: 'email-confirm/email-confirm.html',
                    controller: 'EmailConfirmController',
                    controllerAs: 'vm'
                })
        }])
})();