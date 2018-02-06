(function () {
    'use strict';
    angular
        .module('lnd')
        .controller('DashboardAdsController', DashboardAdsController);

    DashboardAdsController.$inject = ['$state', 'geographyService', 'adsService', 'confirmService'];

    function DashboardAdsController($state, geographyService, adsService, confirmService) {
        var vm = this;

        activate();

        function activate() {
            getAds();
            getLocations();
        }

        function getLocations() {
            geographyService.getLocations().then(function(data) {
                vm.locations = data.data;
            });
        }

        function getAds() {
            adsService.getAds().then(function(response) {
                vm.ads = response.data;
            });
        }

        vm.actionsConfig = {
            edit: goToAdEdit,
            remove: showDeleteLocationModal
        };

        function showDeleteLocationModal(location) {
            var message = "Are you sure you want to delete ad " + location.name + "?";
            confirmService.openConfirmModal(message).then(function(response){
                if (response) {
                    adsService.deleteAd(location.id).then(function(data){
                        getAds();
                    });
                }
            })
        }

        function goToAdEdit(id) {
            $state.go('dashboard.editAd', {id: id})
        }

    }
})();


