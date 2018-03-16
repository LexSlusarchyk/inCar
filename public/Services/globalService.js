(function() {
    'use strict';

    angular
        .module('lnd')
        .factory('globalConfig', globalConfig);

    globalConfig.$inject = [];

    function globalConfig() {
    	var defer;
    	var service = {
            //apiUrl: 'http://lnd-app.us-west-2.elasticbeanstalk.com',
            //apiUrl: 'http://localhost:8081',
            apiUrl: 'http://www.incar.online',
            filterFalseKeys: filterFalseKeys
    	};

    	return service;

        function filterFalseKeys(obj) {
            var responseObj = {};

            _.each(obj, function(value, key) {
                if (value) {
                    responseObj[key] = value;
                }
            });

            return responseObj;
        }
    }

})();
