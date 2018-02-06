(function(){
    'use strict';

    angular
        .module('lnd')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('article', {
                    url:'/article/:id',
                    templateUrl: 'article/article.html',
                    controller: 'ArticleController',
                    controllerAs: 'vm'
                })
        }])
})();