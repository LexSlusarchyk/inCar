(function() {
    'use strict';

    angular
        .module('lnd')
        .factory('geographyService', geographyService);

    geographyService.$inject = ['$q', '$http', 'globalConfig'];
    /* @ngInject */
    function geographyService($q, $http, globalConfig) {

        var apiUrl = globalConfig.apiUrl;

        var service = {
            currentCountry: '',
            currentRegion: '',
            getLocations: getLocations,
            getLocation: getLocation,
            addLocation: addLocation,
            editLocation: editLocation,
            removeLocation: removeLocation,
            getSelected: getSelected
        };

        activate();

        return service;

        function activate() {
            getUsersLocations();
        }

        function getUsersLocations() {
            var user = JSON.parse(localStorage.getItem('userData'));

            if (user && user.country) {
                service.currentCountry = user.country;
            }

            if (user && user.region) {
                service.currentRegion = user.region;
            }
        }

        function addLocation(location) {
            var defered = $q.defer();
            $http.post(apiUrl +  '/api/geography/locations', location).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function editLocation(location) {
            var defered = $q.defer();
            $http.put(apiUrl +  '/api/geography/locations/' + location.id, location).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function removeLocation(locationId) {
            var defered = $q.defer();
            $http.delete(apiUrl +  '/api/geography/locations/' + locationId).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }


        function getLocations() {
            var defered = $q.defer();
            $http.get(apiUrl + '/api/geography/locations').then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function getLocation(locationId) {
            var defered = $q.defer();

            $http.get(apiUrl + '/api/geography/locations/' + locationId).then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }

        function getSelected(selectObj, selectedIdexes) {
            var tree = angular.copy(selectObj);
            var array = [];

            _.each(selectedIdexes, function(index){
               var tree = tree[index];
                array.push(tree);
            });

            return array;
        }
    }
})();