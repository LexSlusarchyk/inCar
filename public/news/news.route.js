(function(){
    'use strict';

    angular
        .module('lnd')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('news', {
                    url:'/news',
                    templateUrl: 'news/news.html',
                    controller: 'NewsController',
                    controllerAs: 'vm'
                })
        }])
})();



