(function() {
    'use strict';

    angular
        .module('lnd')
        .directive('infiniteSelect', infiniteSelect);

    infiniteSelect.$inject = [];
    /* @ngInject */
    function infiniteSelect() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: InfiniteSelectController,
            controllerAs: 'vm',
            restrict: 'E',
            templateUrl: '/layout/infinite-select/infinite-select.html',
            scope: {
                tree: '=',
                selectedOptionsList: '=',
                config: '=?'
            }
        };

        return directive;
    }

    InfiniteSelectController.$inject = ['$rootScope'];
    /* @ngInject */

    function InfiniteSelectController($rootScope) {
        var vm = this;

        vm.selected = {};
        vm.selectedSubLoc = {};

        vm.onBaseOptionChanged = onBaseOptionChanged;
        vm.onOptionsChanged = onOptionsChange;

        activate();

        function activate() {
            if (vm.tree && vm.config && vm.config.preselected && vm.config.preselected.length) {
                var selectedIndexes = getSelectedIndexes();
                setSelectedOptions(selectedIndexes);
                vm.selected = vm.selectedOptionsList[0];

                _.each(vm.selectedOptionsList, function(elem, i) {
                    if (i) {
                        vm.selectedSubLoc[elem.parent] = elem;
                    }
                });
            }
        }


        function setSelectedOptions(indexes) {
            var currentlyIterated;
            var choice;

            _.each(indexes, function(indexElem) {
                if (currentlyIterated) {
                    choice = currentlyIterated[indexElem];
                    currentlyIterated = choice.children;
                } else  {
                    choice = vm.tree[indexElem];
                    currentlyIterated = choice.children
                }

                vm.selectedOptionsList.push(choice);
            });

        }

        function getSelectedIndexes() {
            var currentlyIterated = vm.tree;
            var propToCheck = vm.config.propToCheck;
            var selectedIndexes = [];

            _.each(vm.config.preselected, function(preselectedItem) {
                if (preselectedItem) {
                    var i = 0;
                    currentlyIterated =_.find(currentlyIterated, function(elem) {
                        if (parseInt(elem[propToCheck]) === parseInt(preselectedItem)) {
                            selectedIndexes.push(i);
                            return true;
                        }
                        i++;
                    }).children;
                }
            });

            return selectedIndexes;
        }

        function onBaseOptionChanged() {
            vm.selectedOptionsList.splice(0, vm.selectedOptionsList.length);
            vm.selectedSubLoc = {};

            if (!vm.selected) {
                return false;
            }

            vm.selectedOptionsList.push(vm.selected);

            if (vm.config.onBaseChange) {
                vm.config.onBaseChange(vm.selected.id, true);
            }
        }

        function onOptionsChange(id, index) {
            vm.selectedOptionsList.splice(index + 1, vm.selectedOptionsList.length);

            if (!vm.selectedSubLoc[id]) {
                if (vm.config.onChildChange) {
                    vm.config.onChildChange(null);
                }
                return false;
            }

            if (vm.selectedSubLoc && vm.selectedSubLoc[id]) {
                vm.selectedOptionsList.push(vm.selectedSubLoc[id]);
            }

            if (vm.config.onChildChange) {
                vm.config.onChildChange(vm.selectedSubLoc[id].id);
            }
        }

    }

})();
