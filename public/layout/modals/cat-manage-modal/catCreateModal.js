(function () {
    'use strict';

    angular
        .module('lnd')
        .controller('createCatModalController', createCatModalController);


    createCatModalController.$inject = ['$scope', 'parentCat', 'categoriesService', 'modalService'];
   
    function createCatModalController($scope, parentCat, categoriesService, modalService) {
        var vm = this;
        vm.parentCat = parentCat;
        vm.manageCat = addCat;
        vm.modalMessage = 'Create category: ';

        function addCat() {
            var newCat = {
                name: vm.cat.name,
                parent: parentCat.id
            }
            
            categoriesService.addCat(newCat).then(function(data){
                console.log('cat created');
                modalService.confirmCreation(true);
            });
            
        };
    }

})();

