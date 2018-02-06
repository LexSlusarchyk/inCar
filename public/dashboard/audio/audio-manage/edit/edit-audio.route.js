(function(){
    'use strict';

    angular
        .module('lnd')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('dashboard.editAd', {
                    url:'/editad/:id',
                    templateUrl: 'dashboard/audio/audio-manage/audio-manage.html',
                    controller: 'EditAdController',
                    controllerAs: 'vm'
                })
        }])
})();