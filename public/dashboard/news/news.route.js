(function(){
    'use strict';

    angular
        .module('lnd')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('dashboard.news', {
                    url:'/news',
                    templateUrl: 'dashboard/news/news.html',
                    controller: 'DashboardNewsController',
                    controllerAs: 'vm'
                })
        }])
})();
