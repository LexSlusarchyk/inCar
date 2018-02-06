(function () {
    'use strict';

    angular
        .module('lnd')
        .controller('EditNewsCatModalController', EditNewsCatModalController);


    EditNewsCatModalController.$inject = ['cat', 'newsService', 'modalService'];

    function EditNewsCatModalController(cat, newsService, modalService) {
        var vm = this;
        vm.cat = cat;
        vm.manageCat = editCat;
        vm.modalMessage = 'Edit category title: ';

        function editCat() {
            newsService.editCategory(vm.cat).then(function() {
                modalService.confirmCreation(true);
            });
        }

    }



})();

