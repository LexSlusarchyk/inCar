(function () {
    'use strict';

    angular
        .module('lnd')
        .directive('adminItem', adminItem);

    adminItem.$inject = [];
    /* @ngInject */
    function adminItem() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: AdminItemController,
            controllerAs: 'vm',
            restrict: 'E',
            templateUrl: 'templates/admin-item.html',
            scope: {
                itemId: '=',
                name: '=',
                image: '=',
                actions: '='
            }
        };

        return directive;
    }

    AdminItemController.$inject = ['$rootScope', '$scope', '$element'];
    /* @ngInject */
    function AdminItemController($rootScope, $scope, $element) {
        var vm = this;

        vm.edit = edit;
        vm.remove = remove;

        function edit() {
            if (vm.actions.edit) vm.actions.edit(vm.itemId);
        }

        function remove() {
            if (vm.actions.remove) vm.actions.remove({id: vm.itemId, name: vm.name});
        }

    }
})();

