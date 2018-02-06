(function() {
    'use strict';

    angular
        .module('lnd')
        .directive('notificationsList', notification);

    notification.$inject = [];
    /* @ngInject */
    function notification() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: NotificationController,
            controllerAs: 'vm',
            restrict: 'A',
            templateUrl: '/layout/notification/notification.html',
            scope: {}
        };

        return directive;
    }

    NotificationController.$inject = ['NotificationsList', '$localStorage'];
    /* @ngInject */

    function NotificationController(NotificationsList, $localStorage) {
        var vm = this;

        vm.ignoreList = $localStorage.ignoreList || [];
        vm.notifications = new NotificationsList();

        vm.removeNotification = removeNotification;
        vm.isItemIgnored = isItemIgnored;

        activate();

        function activate() {
            vm.notifications.getRemote();
        }

        function removeNotification(id) {
            vm.ignoreList.push(id);
            updateIgnoreList();
        }

        function isItemIgnored(item) {
            if (!item.isActive) { return true; }

            return vm.ignoreList.indexOf(item.id) !== -1;
        }

        function updateIgnoreList() {
            $localStorage.ignoreList = vm.ignoreList;
        }
    }

})();
