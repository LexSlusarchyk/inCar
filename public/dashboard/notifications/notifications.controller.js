(function () {
    'use strict';
    angular
        .module('lnd')
        .controller('DashboardNotificationsController', DashboardNotificationsController);

    DashboardNotificationsController.$inject = ['$state', 'NotificationsList'];

    function DashboardNotificationsController($state, NotificationsList) {
        var vm = this;

        vm.notifications = new NotificationsList();

        activate();

        function activate() {
            vm.notifications.getRemote();
        }

        function goToAdEdit(id) {
            $state.go('dashboard.editAd', {id: id})
        }

    }
})();


