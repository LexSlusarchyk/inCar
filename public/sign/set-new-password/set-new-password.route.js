(function(){
    'use strict';

    angular
        .module('lnd')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('set-new-password', {
                    url:'/set-new-password/:tok',
                    templateUrl: '/sign/set-new-password/set-new-password.html',
                    controller: 'SetNewPasswordController',
                    controllerAs: 'vm'
                })
        }])
})();