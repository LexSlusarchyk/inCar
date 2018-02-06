(function () {
    'use strict';
    angular
        .module('lnd')
        .controller('DashboardNotificationsManageController', DashboardNotificationsManageController);

    DashboardNotificationsManageController.$inject = ['$state', '$stateParams', 'Notification', 'confirmService'];

    function DashboardNotificationsManageController($state, $stateParams, Notification, confirmService) {
        var vm = this;

        vm.notificationId = $stateParams.id;

        vm.submit = submit;
        vm.showRemoveModal = showRemoveModal;


        activate();

        function activate() {
            if (vm.notificationId) {
                vm.notification = new Notification({id: $stateParams.id});
                vm.notification.getRemote();
                vm.pageTitle = 'Edit notification:';
                vm.buttonText = 'Save';
            } else {
                vm.notification = new Notification();
                vm.buttonText = 'Create';
                vm.pageTitle = 'Create notification:'
            }
        }

        function submit() {
            getSubmitRequest()
                .then(function() {
                    $state.go('dashboard.notifications');
                })
        }

        function getSubmitRequest() {
            return vm.notificationId ?
                vm.notification.update()
                : vm.notification.create();
        }


        function showRemoveModal() {
            var message = "Are you sure you want to delete this notification?";
            confirmService.openConfirmModal(message).then(function(response){
                if (response) {
                    vm.notification.remove().then(function() {
                        $state.go('dashboard.notifications');
                    });
                }
            });
        }
    }
})();

