(function () {
    'use strict';
    angular
        .module('lnd')
        .controller('LocationsController', LocationsController)

    LocationsController.$inject = ['$stateParams', 'geographyService', 'modalService', 'confirmService'];

    function LocationsController($stateParams, geographyService, modalService, confirmService) {
        var vm = this;

        vm.showAddLocationModal = showAddLocationModal;
        vm.showAddBaseLocationModal = showAddBaseLocationModal;
        vm.showEditLocationModal = showEditLocationModal;
        vm.showDeleteLocationModal = showDeleteLocationModal;

        activate();

        function activate() {
            getLocations();
        }

        function getLocations() {
            geographyService.getLocations().then(function(data) {
                vm.locations = data.data;
            });
        }

        function showAddLocationModal(parent) {
            modalService.showAddLocationModal(parent).then(function(response){
                if (response) {
                    getLocations();
                }
            })
        }

        function showEditLocationModal(location) {
            modalService.showEditLocationModal(location).then(function(response){
                if (response) {
                    getLocations();
                }
            })
        }

        function showDeleteLocationModal(location) {
            var message = "Are you sure you want to delete location " + location.name + "?";
            confirmService.openConfirmModal(message).then(function(response){
                if (response) {
                    geographyService.removeLocation(location.id).then(function(data){
                        getLocations();
                    });
                }
            })
        }

        function showAddBaseLocationModal() {
            var loc = {
                id: 1,
                name: 'source'
            };

            modalService.showAddLocationModal(loc).then(function(response){
                if (response) {
                    getLocations();
                }
            })
        }

    }
})();