(function(){
    'use strict';

    angular
        .module('lnd')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('dashboard.createArticle', {
                    url:'/createarticle/:catId',
                    templateUrl: 'dashboard/news/article-manage/article-manage.html',
                    controller: 'CreateArticleController',
                    controllerAs: 'vm'
                })
        }])
})();