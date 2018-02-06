(function () {
    'use strict';

    angular
        .module('lnd')
        .directive('selectImage', selectImage);

    selectImage.$inject = [];
    /* @ngInject */
    function selectImage() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: SelectImageController,
            controllerAs: 'vm',
            restrict: 'E',
            templateUrl: 'templates/select-image.html',
            scope: {
                image: '=',
                config: '=?',
                editable: '=?'
            }
        };

        return directive;
    }

    SelectImageController.$inject = ['$scope', '$element', '$uibModal', 'cropperService'];

    function SelectImageController($scope, $element, $uibModal, cropperService) {
        var vm = this;
        vm.triggerInput = triggerInput;
        vm.onImageLoaded = onImageLoaded;

        vm.inputId = 'input-' + chance.guid();

        var defaultConfig = {
            aspectRatio: 1,
            resizeTo: 500
        };

        if (vm.config) {
            vm.config.aspectRatio = vm.config.aspectRatio || defaultConfig.aspectRatio;
            vm.config.resizeTo = vm.config.resizeTo || defaultConfig.resizeTo;
        } else {
            vm.config = defaultConfig;
        }

        function onImageLoaded(file) {
            cropperService.openCropper(file, vm.config.aspectRatio, vm.config.resizeTo).then(function(data){
                vm.image = data;
            });

            $('#' + vm.inputId).val(null);
        }

        function triggerInput() {
            $('#' + vm.inputId).click();
        }
    }

})();