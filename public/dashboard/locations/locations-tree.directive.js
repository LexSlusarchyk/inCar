(function() {
    'use strict';

    angular
        .module('lnd')
        .directive('locationsTree', locationsTree);

    locationsTree.$inject = ['$compile'];
    /* @ngInject */
    function locationsTree($compile) {
        var directive = {
            transclude: true,
            replace: true,
            bindToController: true,
            controller: LocationsTreeController,
            controllerAs: 'vm',
            restrict: 'E',
            templateUrl: 'dashboard/locations/locations-tree.html',
            scope: {
                treeItems: '='
            },
            compile: function(tElement, tAttr, transclude) {
                var contents = tElement.contents().remove();
                var compiledContents;
                return function(scope, iElement, iAttr) {
                    if(!compiledContents) {
                        compiledContents = $compile(contents, transclude);
                    }
                    compiledContents(scope, function(clone, scope) {
                        iElement.append(clone);
                    });
                };
            }
        };

        return directive;
    }

    LocationsTreeController.$inject = ['$scope', 'modalService'];
    /* @ngInject */
    function LocationsTreeController($scope, modalService) {
        var vm = this;

        vm.toggleItemExpantion = toggleItemExpantion;
        vm.showAddLocationModal = showAddLocationModal;
        vm.showEditLocationModal = showEditLocationModal;
        vm.showDeleteLocationModal = showDeleteLocationModal;

        function toggleItemExpantion(item, event) {
            event.stopPropagation();

            if (item.children && item.children.length) {
                item.isExpanded = !item.isExpanded;
            }
        }

        function showAddLocationModal(parent, event) {
            event.stopPropagation();

            $scope.$parent.vm.showAddLocationModal(parent, event);
        }

        function showEditLocationModal(parent, event) {
            event.stopPropagation();

            $scope.$parent.vm.showEditLocationModal(parent, event);
        }

        function showDeleteLocationModal(parent, event) {
            event.stopPropagation();

            $scope.$parent.vm.showDeleteLocationModal(parent, event);
        }


    }
})();
