(function () {
    'use strict';

    angular
        .module('lnd')
        .directive('catTreeIndented', catTreeIndented);

    catTreeIndented.$inject = [];
    /* @ngInject */
    function catTreeIndented() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: catTreeIndentedController,
            controllerAs: 'vm',
            restrict: 'E',
            templateUrl: 'templates/cat-tree-indented.html',
            scope: {
                cats: '=',
                config: '=?'
            }
        };

        return directive;
    }

    catTreeIndentedController.$inject = ['$rootScope', '$scope', '$element', '$uibModal', 'categoriesService', 'modalService', 'confirmService'];
    /* @ngInject */
    function catTreeIndentedController($rootScope, $scope, $element, $uibModal, categoriesService, modalService, confirmService) {
        var vm = this;
        
        vm.newCat = {};
        vm.removeCat = removeCat;
        vm.showAddSubcatModal = showAddSubcatModal;
        vm.showEditSubcatModal = showEditSubcatModal;
        vm.setActiveCat = setActiveCat;

        function removeCat(cat) {
            var message = 'Are you sure you want to remove ' + cat.name + ' category?';
            confirmService.openConfirmModal(message).then(function(response){
                if (response) {
                    categoriesService.removeCat(cat.id).then(function(data){
                        categoriesService.getCatsList().then(function(data){
                            vm.cats = data.data;
                        });
                    });
                }
            })
        }

        function showAddSubcatModal(parentCat) {
            modalService.showAddSubcatModal(parentCat).then(function(response){
                categoriesService.getCatsList().then(function(data){
                    vm.cats = data.data;
                });
            })
        }

        function showEditSubcatModal(cat) {
            modalService.showEditSubcatModal(cat).then(function(response) {
                if (response) {
                    // vm.cats = response;
                }
            })
        }

        function setActiveCat(catId) {
            vm.config.filterCat = catId
        }

    }
})();

