(function() {
    'use strict';

    angular
        .module('lnd')
        .factory('adsService', adsService);

    adsService.$inject = ['$q', '$http', 'globalConfig'];
    /* @ngInject */
    function adsService($q, $http, globalConfig) {
        var apiUrl = globalConfig.apiUrl;

        var service = {
            getAds: getAds,
            getSecondaryAds: getSecondaryAds,
            getAd: getAd,
            getMainAd: getMainAd,
            createAd: createAd,
            editAd: editAd,
            deleteAd: deleteAd
        };

        return service;

        function getAds(catId) {
            var defered = $q.defer();
            var query;
            if (catId) {
                query = apiUrl + '/api/audio/category/' + catId;
            } else {
                query = apiUrl + '/api/audio';
            }

            $http.get(query).then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }

        function getSecondaryAds(quantity) {
            var defered = $q.defer();
            var query = apiUrl + '/api/audio/secondary/random';

            $http.get(query, { params: {quantity: quantity}}).then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }

        function getAd(id) {
            var defered = $q.defer();
            var query = apiUrl + '/api/audio/' + id;

            $http.get(query).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function getMainAd() {
            var defered = $q.defer();
            var query = apiUrl + '/api/audio/main/random';


            $http.get(query).then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }

        function createAd(ad) {
            var defered = $q.defer();
            var query = apiUrl + '/api/audio';
            $http.post(query, ad).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function editAd(ad) {
            var defered = $q.defer();
            var query = apiUrl + '/api/audio/' + ad.id;

            $http.put(query, ad).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }


        function deleteAd(id) {
            var defered = $q.defer();
            var query = apiUrl + '/api/audio/' + id;

            $http.delete(query).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

    }
})();


