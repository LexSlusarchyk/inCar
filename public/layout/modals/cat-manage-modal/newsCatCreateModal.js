(function () {
    'use strict';

    angular
        .module('lnd')
        .controller('CreateNewsCatModalController', CreateNewsCatModalController);


    CreateNewsCatModalController.$inject = ['newsService', 'modalService'];

    function CreateNewsCatModalController(newsService, modalService) {
        var vm = this;

        vm.manageCat = addCat;
        vm.modalMessage = 'Create category: ';

        function addCat() {
            var newCat = {
                name: vm.cat.name
            };

            newsService.createCategory(newCat).then(function(data){
                modalService.confirmCreation(true);
            });

        }
    }

})();

