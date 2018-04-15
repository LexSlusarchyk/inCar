(function () {
    'use strict';

    angular
        .module('lnd')
        .controller('ForgotPasswordController', ForgotPasswordController);

    ForgotPasswordController.$inject = ['$rootScope', 'translateService', 'usersService', '$state'];

    function ForgotPasswordController($rootScope, translateService, usersServic$state) {
        var vm = this;
        vm.profile = translateService.data.lang['profile'];
        vm.credentials = {};

        vm.submit = submit;


        function submit() {
            usersService.requestPasswordChange(vm.credentials.email).then(function(response){
                console.log(vm.credentials.email);

                if (response.data && response.data.code === "ER_DUP_ENTRY") {
                    vm.duplicateError = true;
                } else {
                    alert('Succes! Check your email');
                    $state.go('sign.in');
                }

            });
        }

        $rootScope.$on('lang-changed', function() {
            vm.profile = translateService.data.lang['profile'];
        })

    }

})();