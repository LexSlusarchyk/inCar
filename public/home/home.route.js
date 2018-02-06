(function(){
    'use strict';

    angular
        .module('lnd')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$urlMatcherFactoryProvider',
            function($stateProvider, $urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider) {
                $locationProvider.html5Mode(true);
                $urlMatcherFactoryProvider.strictMode(false);
                $stateProvider
                    .state('home', {
                        url:'/',
                        templateUrl: 'home/home.html',
                        controller: 'HomeController',
                        controllerAs: 'vm'
                    })
        }])
})();
