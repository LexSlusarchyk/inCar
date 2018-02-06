(function () {
    'use strict';

    angular
        .module('lnd')
        .controller('editCatModalController', editCatModalController);


    editCatModalController.$inject = ['$scope', 'cat', 'categoriesService', 'modalService'];
   
    function editCatModalController($scope, cat, categoriesService, modalService) {
        var vm = this;
        vm.cat = cat;
        vm.manageCat = editCat;
        vm.modalMessage = 'Edit category: ';

        
        function editCat() {
            var editCat = categoriesService.editCat(vm.cat);
            modalService.confirmCreation(editCat);
        }

    }



})();

