(function () {
    'use strict';
    angular
        .module('lnd')
        .controller('NewsController', NewsController);

    NewsController.$inject = ['$rootScope', '$state', 'newsService', 'geographyService', 'usersService', 'translateService'];

    function NewsController($rootScope, $state, newsService, geographyService, usersService, translateService) {
        var vm = this;

        vm.activeCategoryId = null;
        vm.usersService = usersService;

//        vm.filterFunction = filterFunction;
        vm.goToArticle = goToArticle;
        vm.changeActiveCategory = changeActiveCategory;
        vm.langNews = translateService.data.lang['news'];



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

            $rootScope.$on('lang-changed', function() {
                vm.langNews = translateService.data.lang['news'];
            })
        }

        vm.onBaseOptionChanged = function() {

        };
/*
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
*/
        function goToArticle(article) {
            $state.go('article', {id: article.id});
        }

        function changeActiveCategory(category) {
            vm.activeCategoryId = category;
        }

    }
})();