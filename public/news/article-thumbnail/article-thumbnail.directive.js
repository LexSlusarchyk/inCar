(function () {
    'use strict';

    angular
        .module('lnd')
        .directive('articleThumbnail', articleThumbnail);

    articleThumbnail.$inject = [];
    /* @ngInject */
    function articleThumbnail() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: ArticleThumbnailController,
            controllerAs: 'vm',
            restrict: 'E',
            templateUrl: 'news/article-thumbnail/article-thumbnail.html',
            scope: {
                article: '='
            }
        };

        return directive;
    }

    ArticleThumbnailController.$inject = [];
    /* @ngInject */
    function ArticleThumbnailController() {
        var vm = this;

        vm.formatArticleDate = formatArticleDate;

        activate();

        function activate() {

        }

        function formatArticleDate() {
            if (vm.article.date) {
                return moment(vm.article.date).startOf('day').fromNow();
            }
        }

    }
})();

