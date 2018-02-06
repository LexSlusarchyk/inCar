(function() {
	'use strict';

	angular
		.module('lnd')
		.factory('cropperService', cropperService);

	cropperService.$inject = ['$http', '$q', '$uibModal', 'Cropper', 'mediaService'];
	/* @ngInject */
	function cropperService($http, $q, $modal, Cropper, mediaService) {
		var defer;
		var imageData = {};

		var service = {
			blob: null,
			aspectRatio: null,
			cropWidth: null,
			imageData: imageData,
			openCropper: openCropper,
			sendImage: sendImage
		};

		return service;


		function openCropper(blob, aspectRatio, cropWidth) {
			defer = $q.defer();
			service.blob = blob;
			service.aspectRatio = aspectRatio;
			service.cropWidth = cropWidth;
			if (blob) {
				$modal.open({
					templateUrl: 'layout/modals/crop-modal/crop-modal.html',
					controller: 'CropController',
					controllerAs: 'vm',
					size: 'lg'
				})
			}
			return defer.promise;
		}

		function sendImage(image) {
			mediaService.uploadBase64Image(image).then(function(data){
				defer.resolve(data.data.imageUrl);
			})
		}





	}

})();


