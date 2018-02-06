(function () {
    'use strict';
    angular
        .module('lnd')
        .controller('CreateArticleController', CreateArticleController);

    CreateArticleController.$inject = ['$state', '$stateParams', 'geographyService', 'newsService', 'modalService', 'confirmService'];

    function CreateArticleController($state, $stateParams, geographyService, newsService, modalService, confirmService) {
        var vm = this;

        vm.article = {
            catId: $stateParams.catId
        };

        vm.buttonText = 'Create Article';
        vm.manageArticle = createArticle;
        vm.selectedLocations = [];


        activate();

        function activate() {
           getLocations();
        }

        function getLocations() {
            geographyService.getLocations().then(function(data) {
                vm.locations = data.data;
            });
        }

        function createArticle() {
            var locations = getArticleLocations();

            vm.article.baseLocation = locations[0];
            vm.article.location = locations[locations.length -1];
            vm.article.date = new Date();

            newsService.createArticle(vm.article).then(function(response) {
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


