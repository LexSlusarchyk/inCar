(function() {
    'use strict';

    angular
        .module('lnd')
        .factory('textsService', textsService);

    textsService.$inject = ['$q', '$http', 'globalConfig'];
    /* @ngInject */
    function textsService($q, $http, globalConfig) {

        var apiUrl = globalConfig.apiUrl;

        var service = {
            getText: getText,
            updateText: updateText,

        };

        return service;

        function getText(type) {
            var defered = $q.defer();
            $http.get(apiUrl + '/api/texts/' + type).then(function(response){
                defered.resolve(response);
            });
            return defered.promise;
        }

        function updateText(newText, type) {
            var defered = $q.defer();
            var requestBody = {
                markup: newText,
                type: type
            };

            $http.post(apiUrl + '/api/texts', requestBody).then(function(response){
                defered.resolve(response);
            });

            return defered.promise;
        }
    }
})();