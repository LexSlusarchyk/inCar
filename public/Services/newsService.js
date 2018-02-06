(function() {
    'use strict';

    angular
        .module('lnd')
        .factory('newsService', newsService);

    newsService.$inject = ['$q', '$http', 'globalConfig'];
    /* @ngInject */
    function newsService($q, $http, globalConfig) {
        var apiUrl = globalConfig.apiUrl;

        var service = {
            getNews: getNews,
            getLastNews: getLastNews,
            getArticle: getArticle,
            createArticle: createArticle,
            editArticle: editArticle,
            deleteArticle: deleteArticle,
            getCategories: getCategories,
            createCategory: createCategory,
            editCategory: editCategory,
            deleteCategory: deleteCategory
        };

        return service;

        function getNews(catId) {
            var defered = $q.defer();
            var query;
            if (catId) {
                query = apiUrl + '/api/news/category/' + catId;
            } else {
                query = apiUrl + '/api/news';
            }

            $http.get(query).then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }

        function getLastNews() {
            var defered = $q.defer();
            var query = apiUrl + '/api/news/last';

            $http.get(query).then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }

        function getArticle(id) {
            var defered = $q.defer();
            var query = apiUrl + '/api/news/' + id;

            $http.get(query).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function createArticle(article) {
            var defered = $q.defer();
            var query = apiUrl + '/api/news';
            $http.post(query, article).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function editArticle(article) {
            var defered = $q.defer();
            var query = apiUrl + '/api/news/' + article.id;
            var requestBody = globalConfig.filterFalseKeys(article);

            $http.put(query, requestBody).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }


        function deleteArticle(id) {
            var defered = $q.defer();
            var query = apiUrl + '/api/news/' + id;

            $http.delete(query).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }


        function getCategories() {
            var defered = $q.defer();
            var query = apiUrl + '/api/newscategories';

            $http.get(query).then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }

        function createCategory(category) {
            var defered = $q.defer();
            var query = apiUrl + '/api/newscategories';

            $http.post(query, category).then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }

        function editCategory(category) {
            var defered = $q.defer();
            var query = apiUrl + '/api/newscategories/' + category.id;

            $http.put(query, category).then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }

        function deleteCategory(categoryId) {
            var defered = $q.defer();
            var query = apiUrl + '/api/newscategories/' + categoryId;

            $http.delete(query).then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }

    }
})();


