(function () {
    'use strict';
    angular
        .module('lnd')
        .controller('NewsController', NewsController);

    NewsController.$inject = ['$state', 'newsService', 'geographyService', 'usersService'];

    function NewsController($state, newsService, geographyService, usersService) {
        var vm = this;

        vm.activeCategoryId = null;
        vm.usersService = usersService;

        vm.filterFunction = filterFunction;
        vm.goToArticle = goToArticle;
        vm.changeActiveCategory = changeActiveCategory;



        activate();


        function activate() {
            geographyService.getLocations().then(function(response) {
                vm.locations = response.data;
            });

            newsService.getNews().then(function (response) {
                vm.news = response.data;
            });

            newsService.getCategories().then(function(response) {
                vm.categories = response.data;
            });
        }

        vm.onBaseOptionChanged = function() {

        };

        function filterFunction(actual) {
            var result = true;

            if (geographyService.currentCountry) {
                result = parseInt(geographyService.currentCountry) === parseInt(actual.baseLocation);
            }

            if (result && geographyService.currentRegion) {
                result = parseInt(geographyService.currentRegion) === parseInt(actual.location);
            }

            return result;
        }

        function goToArticle(article) {
            $state.go('article', {id: article.id});
        }

        function changeActiveCategory(category) {
            vm.activeCategoryId = category;
        }

    }
})();