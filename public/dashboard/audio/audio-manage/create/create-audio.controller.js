(function () {
    'use strict';
    angular
        .module('lnd')
        .controller('CreateAdController', CreateAdController);

    CreateAdController.$inject = ['$state', '$stateParams', 'geographyService', 'adsService', 'modalService', 'confirmService'];

    function CreateAdController($state, $stateParams, geographyService, adsService, modalService, confirmService) {
        var vm = this;

        vm.ad = {};

        vm.buttonText = 'Create Ad';
        vm.manageAd = createAd;
        vm.selectedLocations = [];

        vm.cropperConfig = {
            aspectRatio: 10 / 15,
            resizeTo: 600
        };

        vm.wallCropperConfig = {
            aspectRatio: 21 / 10,
            resizeTo: 1400
        };

        activate();

        function activate() {
            getLocations();
        }

        function getLocations() {
            geographyService.getLocations().then(function(data) {
                vm.locations = data.data;
                vm.multiselectConfig = {};
            });
        }

        function createAd() {
            var locations = getAdLocations();

            vm.ad.baseLocation = locations[0];
            vm.ad.location = locations[locations.length -1];

            adsService.createAd(vm.ad).then(function(response) {
                $state.go('dashboard.ads');
            });
        }

        function getAdLocations() {
            var locationsList = [];
            _.each(vm.selectedLocations, function(elem) {
                locationsList.push(elem.id);
            });

            return locationsList;
        }

    }
})();


