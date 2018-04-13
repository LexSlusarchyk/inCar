(function(){
    'use strict';

    angular
        .module('lnd')
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider
                .state('forgot-password', {
                    url:'/forgot-password',
                    templateUrl: 'sign/forgot-password/forgot-password.view.html',
                    controller: 'ForgotPasswordController',
                    controllerAs: 'vm'
                })
        }])
})();