(function() {
    'use strict';

    angular
        .module('lnd')
        .factory('notifications', notifications);

    notifications.$inject = ['$q', '$http', 'globalConfig'];
    /* @ngInject */
    function notifications($q, $http, globalConfig) {
        var apiUrl = globalConfig.apiUrl;

        var service = {
            getById: getById,
            getAll: getAll,
            create: create,
            edit: edit,
            remove: remove
        };

        return service;

        function getById(id) {
            var defered = $q.defer();
            var query = apiUrl + '/api/notifications/' + id;

            $http.get(query).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function getAll() {
            var defered = $q.defer();
            var query = apiUrl + '/api/notifications';

            $http.get(query).then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }


        function create(ad) {
            var defered = $q.defer();

            $http.post(apiUrl + '/api/notifications', ad).then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }

        function edit(notification) {
            var defered = $q.defer();
            var query = apiUrl + '/api/notifications/' + notification.id;

            $http.put(query, notification).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }


        function remove(id) {
            var defered = $q.defer();
            var query = apiUrl + '/api/notifications/' + id;

            $http.delete(query).then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }

    }
})();


