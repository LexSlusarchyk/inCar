(function () {
    'use strict';

    angular
        .module('lnd')
        .controller('CreateLocationModalController', CreateLocationModalController);


    CreateLocationModalController.$inject = ['parentLocation', 'geographyService', 'modalService'];

    function CreateLocationModalController(parentLocation, geographyService, modalService) {
        var vm = this;
        vm.parentLocation = parentLocation;
        vm.manageLocation = addLocation;

        function addLocation() {
            var newLocation = {
                name: vm.location.name,
                parent: parentLocation.id
            };

            console.log(newLocation);

            geographyService.addLocation(newLocation).then(function(data){
                modalService.confirmCreation(true);
            });

        }
    }

})();
