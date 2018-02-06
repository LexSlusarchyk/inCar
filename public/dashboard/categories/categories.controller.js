(function () {
    'use strict';
    angular
        .module('lnd')
        .controller('DashboardCategoriesController', DashboardCategoriesController);

    DashboardCategoriesController.$inject = ['categoriesService', 'modalService'];

    function DashboardCategoriesController(categoriesService, modalService) {
        var vm = this;

        vm.addBaseCat = addBaseCat;

        activate();

        function activate() {
            categoriesService.getCatsList().then(function(data){
                vm.cats = data.data;
            });
        }

        function addBaseCat() {
            var cat = {
                id: 1,
                name: 'source'
            };

            modalService.showAddSubcatModal(cat).then(function(response){
                if (response) {
                    categoriesService.getCatsList().then(function(data){
                        vm.cats = data.data;
                    });
                }
            })
        }

    }
})();



