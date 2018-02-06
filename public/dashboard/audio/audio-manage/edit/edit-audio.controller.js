(function () {
    'use strict';
    angular
        .module('lnd')
        .controller('EditAdController', EditAdController);

    EditAdController.$inject = ['$state', '$stateParams', 'geographyService', 'adsService', 'modalService', 'confirmService'];

    function EditAdController($state, $stateParams, geographyService, adsService, modalService, confirmService) {
        var vm = this;

        vm.buttonText = 'Edit Ad';
        vm.manageAd = editAd;
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

        function getAd(id) {
            adsService.getAd(id).then(function(response) {
                vm.ad = validateResponse(response.data);
                vm.multiselectConfig = {
                    propToCheck: 'id',
                    preselected: [vm.ad.baseLocation, vm.ad.location]
                }
            });
        }

        function validateResponse(response) {
            response.isMainAd = response.isMainAd ? true : false;
            response.isDisabled = response.isDisabled ? true : false;

            return response;
        }

        function getLocations() {
            geographyService.getLocations().then(function(data) {
                vm.locations = data.data;
                getAd(parseInt($stateParams.id));
            });
        }

        function editAd() {
            var locations = getAdLocations();

            vm.ad.baseLocation = locations[0];
            vm.ad.location = locations[locations.length -1];

            adsService.editAd(vm.ad).then(function(response) {
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

