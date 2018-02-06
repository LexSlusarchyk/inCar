(function() {
    'use strict';
    angular
        .module('lnd')
        .controller('CropController', CropController);

    CropController.$inject = ['$scope', '$uibModalInstance', '$animate', 'Cropper', '$timeout', '$uibModalStack', 'cropperService'];

    function CropController($scope, $uibModalInstance, $animate, Cropper, $timeout, $uibModalStack, cropperService) {
        var vm = this;

        var file, data;

        vm.cropperService = cropperService;
        vm.cropper = {};
        vm.cropperProxy = 'cropper.first';
        vm.blob = cropperService.blob;
        vm.cropWidth = cropperService.cropWidth;
        vm.aspectRatio = cropperService.aspectRatio;

        Cropper.encode(file = cropperService.blob).then(function(dataUrl) {
            vm.dataUrl = dataUrl;
            $timeout(showCropper);
        });

        vm.getPreview = getPreview;
        vm.scale = scale;
        vm.sendFile = sendFile;
        vm.clear = clear;

        function getPreview() {
            if (!cropperService.blob || !data) return;

            Cropper.crop(file, data).then(Cropper.encode).then(function(dataUrl) {
                (vm.preview || (vm.preview = {})).dataUrl = dataUrl;
                cropperService.imageData.cropped = dataUrl;
            })
        }

        function clear() {
            if (!vm.cropper.first) return;
            vm.cropper.first('clear');
        }

        function scale() {
            Cropper.crop(file, data)
                .then(function(blob) {
                    return Cropper.scale(blob, {width: vm.cropWidth});
                })
                .then(Cropper.encode).then(function(dataUrl) {
                    (vm.preview || (vm.preview = {})).dataUrl = dataUrl;
                });
        }

        function sendFile() {
            cropperService.sendImage(vm.preview.dataUrl);
            $uibModalStack.dismissAll()
        }

        vm.showEvent = 'show';
        vm.hideEvent = 'hide';

        vm.options = {
            maximize: true,
            aspectRatio: cropperService.aspectRatio,
            crop: function(dataNew) {
                data = dataNew;
            }
        };

        function showCropper() {
            $scope.$broadcast(vm.showEvent);
        }
        function hideCropper() {
            $scope.$broadcast(vm.hideEvent);
        }

    }



})();





