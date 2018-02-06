(function(){
    'use strict';

    angular
        .module('lnd')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('texts', {
                    url:'/texts/:id',
                    templateUrl: 'texts/texts.html',
                    controller: 'TextsController',
                    controllerAs: 'vm'
                })
        }])
})();