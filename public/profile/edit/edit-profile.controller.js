(function () {
    'use strict';

    angular
        .module('lnd')
        .controller('EditProfileController', EditProfileController);

    EditProfileController.$inject = ['$rootScope', '$scope', '$stateParams', '$state', 'usersService', 'geographyService', 'translateService'];
    /* @ngInject */
    function EditProfileController($rootScope, $scope, $stateParams, $state, usersService, geographyService, translateService) {
        var vm = this;
        var userId = $stateParams.id;
        vm.updateUser = updateUser;
        vm.selectedLocations = [];
        vm.profile = translateService.data.lang['profile'];


        activate();

        function activate() {
            getLocations();
            getUser();
            $rootScope.$on('lang-changed', function() {
                vm.profile = translateService.data.lang['profile'];
            })
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