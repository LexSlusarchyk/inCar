(function(){
    'use strict';

    angular
        .module('lnd')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('dashboard.createAd', {
                    url:'/createad',
                    templateUrl: 'dashboard/audio/audio-manage/audio-manage.html',
                    controller: 'CreateAdController',
                    controllerAs: 'vm'
                })
        }])
})();