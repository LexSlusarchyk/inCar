(function () {
    'use strict';

    angular
        .module('lnd')
        .controller('EditProfileController', EditProfileController);

    EditProfileController.$inject = ['$scope', '$stateParams', '$state', 'usersService', 'geographyService'];
    /* @ngInject */
    function EditProfileController($scope, $stateParams, $state, usersService, geographyService) {
        var vm = this;
        var userId = $stateParams.id;
        vm.updateUser = updateUser;
        vm.selectedLocations = [];


        activate();

        function activate() {
            getLocations();
            getUser();
        }

        function getUser() {
            usersService.getUser(userId).then(function(data){
                vm.user = data.data;
                vm.multiselectConfig = {
                    propToCheck: 'id',
                    preselected: [vm.user.country, vm.user.region]
                }
            });
        }

        function getLocations() {
            geographyService.getLocations().then(function(data) {
                vm.locations = data.data;
                getUser();
            });
        }

        function updateUser(user) {
            if (vm.selectedLocations[0]) {
                user.country = vm.selectedLocations[0].id;
            }

            if (vm.selectedLocations[1]) {
                user.region = vm.selectedLocations[1].id;
            }

            usersService.updateProfile(user).then(function(data){
                $state.go('profile', {id: userId});
            })
        } 
    }
})();