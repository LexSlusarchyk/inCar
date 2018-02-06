(function () {
    'use strict';
    angular
        .module('lnd')
        .controller('EditArticleController', EditArticleController);

    EditArticleController.$inject = ['$stateParams', '$state', 'geographyService', 'newsService', 'modalService', 'confirmService'];

    function EditArticleController($stateParams, $state, geographyService, newsService, modalService, confirmService) {
        var vm = this;

        var articleId = parseInt($stateParams.id);
        vm.buttonText = 'Edit Article';
        vm.manageArticle = editArticle;
        vm.selectedLocations = [];

        activate();

        function activate() {
            getLocations();
            getArticle();
        }

        function getLocations() {
            geographyService.getLocations().then(function(data) {
                vm.locations = data.data;
            });
        }

        function getArticle() {
            newsService.getArticle(articleId).then(function(response) {
                vm.article = response.data;
            })
        }

        function editArticle() {
            var locations = getArticleLocations();

            vm.article.baseLocation = locations[0];
            vm.article.location = locations[locations.length -1];

            if (!vm.article.date) {
                vm.article.date = new Date();
            }

            newsService.editArticle(vm.article).then(function(response) {
                $state.go('dashboard.news');
            });
        }

        function getArticleLocations() {
            var locationsList = [];
            _.each(vm.selectedLocations, function(elem) {
                locationsList.push(elem.id);
            });

            return locationsList;
        }

    }
})();


