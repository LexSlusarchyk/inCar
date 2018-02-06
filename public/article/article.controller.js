(function () {
    'use strict';
    angular
        .module('lnd')
        .controller('ArticleController', ArticleController);

    ArticleController.$inject = ['$stateParams', 'newsService', 'geographyService'];

    function ArticleController($stateParams, newsService, geographyService) {
        var vm = this;
        var articleId = $stateParams.id;


        activate();


        function activate() {
            newsService.getArticle(articleId).then(function(response) {
                vm.article = response.data;
            })
        }


    }
})();