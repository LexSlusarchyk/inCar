

(function () {
    'use strict';

    angular
        .module('lnd')
        .controller('EditLocationModalController', EditLocationModalController);


    EditLocationModalController.$inject = ['location', 'geographyService', 'modalService'];

    function EditLocationModalController(location, geographyService, modalService) {
        var vm = this;
        vm.location = location;
        vm.manageLocation = editLocation;


        function editLocation() {
            var editLocation = geographyService.editLocation(vm.location);
            modalService.confirmCreation(editLocation);
        }

    }



})();
