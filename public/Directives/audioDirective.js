(function () {
    'use strict';

    angular
        .module('lnd')
        .directive('audioItem', audioItem);

    audioItem.$inject = [];
    /* @ngInject */
    function audioItem() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: audioItemController,
            controllerAs: 'vm',
            restrict: 'E',
            templateUrl: 'templates/audio.html',
            scope: {
                category: '=?',
                maxLength: '=?'
            }
        };

        return directive;
    }

    audioItemController.$inject = ['adsService'];
    /* @ngInject */
    function audioItemController(adsService) {
        var vm = this;

        activate();

        function activate() {
            adsService.getSecondaryAds(vm.maxLength).then(function(response) {
                vm.audios = response.data;
            })
        }
    }
})();
