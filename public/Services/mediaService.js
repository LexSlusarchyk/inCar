(function() {
	'use strict';

	angular
		.module('lnd')
		.factory('mediaService', mediaService);

	mediaService.$inject = ['$q', '$http', 'globalConfig'];

	function mediaService($q, $http, globalConfig) {
		var apiUrl = globalConfig.apiUrl;
		var service = {
			uploadBase64Image: uploadBase64Image
		}

		return service;

		function uploadBase64Image(base64Image) {
			var defered = $q.defer();
			var reqBody = {
				imageString: base64Image
			}

			$http.post(apiUrl + '/api/media/base64image', reqBody).then(function(data){
				defered.resolve(data)
			})

			return defered.promise
		}
	}


})()
