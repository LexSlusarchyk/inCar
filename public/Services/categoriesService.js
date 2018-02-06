(function() {
    'use strict';

    angular
        .module('lnd')
        .factory('categoriesService', categoriesService);

    categoriesService.$inject = ['$q', '$http', 'globalConfig'];
    /* @ngInject */
    function categoriesService($q, $http, globalConfig) {

        var apiUrl = globalConfig.apiUrl;

        var service = {
            getTree: getTree,
            addCat: addCat,
            getCat: getCat,
            editCat: editCat,
            removeCat: removeCat,
            getCatsList: getCatsList
        };

        return service;

        function addCat(category) {
            var defered = $q.defer();
            $http.post(apiUrl +  '/api/cats', category).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function getCat(catId){
            var defered = $q.defer();
            $http.get(apiUrl +  '/api/cats/' + catId).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function editCat(category) {
            var defered = $q.defer();
            $http.put(apiUrl +  '/api/cats/' + category.id, category).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function removeCat(categoryId) {
            var defered = $q.defer();
            $http.delete(apiUrl +  '/api/cats/' + categoryId).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }


        function getTree() {
            var defered = $q.defer();
            $http.get(apiUrl + '/api/catstree').then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function getCatsList() {
            var defered = $q.defer();
            $http.get(apiUrl + '/api/cats').then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }
    }
})();