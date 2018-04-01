(function () {
    'use strict';

    angular
        .module('lnd')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'usersService', 'eventsService',
        'geographyService', 'confirmService', 'translateService'];
    /* @ngInject */
    function ProfileController($rootScope, $scope, $state, $stateParams, usersService, eventsService,
                               geographyService, confirmService, translateService) {
        var vm = this;
        var userId = $stateParams.id;

        vm.editableImage = false;

        vm.signOut = signOut;

        vm.profile = translateService.data.lang['profile'];

        activate();

        function activate() {
            getUser();
            getUsersTickets();

            $scope.$watch('vm.image', function(newV, oldV) {
                if (newV && oldV !== undefined) {
                    vm.user.imageurl = newV;
                    usersService.updateProfile(vm.user).then(function(data){
                        console.log('Profile updated.')
                    })
                }
            })
            $rootScope.$on('lang-changed', function() {
                vm.profile = translateService.data.lang['profile'];
            })
        }

        function getUser() {
            usersService.getUser(userId).then(function(data){
                vm.user = data.data;
                vm.image = data.data.imageurl;
                vm.editableImage = true;
                getCountry();
            });
        }

        function getUsersTickets() {
            eventsService.getUserTickets(userId).then(function(response){
                vm.events = ticketsToEvents(response.data);
            });
        }

        function getCountry() {
            geographyService.getLocation(vm.user.country).then(function(response) {
                vm.countryLabel = response.data.name;
            });
        }

        function ticketsToEvents(tickets) {
            var events = [];

            _.each(tickets, function(elem) {
                events.push({
                    id: elem.eventId,
                    name: elem.eventName,
                    imageUrl: elem.eventImgUrl
                });
            });

            return events;
        }

        function signOut() {
            var message = 'Are you sure?';

            confirmService.openConfirmModal(message).then(function(response) {
                if (response) {
                    usersService.signOut();
                    $state.go('sign.in');
                }
            });
        }

    }
})();