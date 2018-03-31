(function () {
    'use strict';

    angular
        .module('lnd')
        .controller('BaseController', BaseController);

    BaseController.$inject = ['$rootScope', '$state', 'categoriesService', 'usersService', '$uibModalStack', 'confirmService', 'translateService'];
    /* @ngInject */
    function BaseController($rootScope, $state, categoriesService, usersService, $uibModalStack, confirmService, translateService) {
        var vm = this;

        vm.usersService = usersService;
        vm.translateService = translateService;
        vm.signOut = signOut;
        vm.changeLang = changeLang;
        vm.nav = translateService.data.lang['nav'];

        activate();

        function activate() {
            getCategories();

            $rootScope.$on('token-invalid', function(){
                throwOut();
            });

            $rootScope.$on('lang-changed', function() {
                vm.nav = translateService.data.lang['nav'];
            })
        }

        function changeLang(lang) {
            translateService.setLang(lang);                
        }


        function signOut() {
            var message = 'Are you sure?';

            confirmService.openConfirmModal(message).then(function(response) {
                if (response) {
                    usersService.signOut();
                    $state.go('sign.in');
                }
            });
        }

        function throwOut() {
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
            $uibModalStack.dismissAll();
            $state.go('sign.in');
        }

        function getCategories() {
            categoriesService.getTree().then(function(data){
                vm.tree = data.data;
                vm.activeCat = vm.tree;
            });
        }

    }
})();

