(function(){
    'use strict';

    angular
        .module('lnd')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('dashboard.editArticle', {
                    url:'/editarticle/:id',
                    templateUrl: 'dashboard/news/article-manage/article-manage.html',
                    controller: 'EditArticleController',
                    controllerAs: 'vm'
                })
        }])
})();
