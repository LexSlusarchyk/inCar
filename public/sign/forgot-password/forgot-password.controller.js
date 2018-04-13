(function () {
    'use strict';

    angular
        .module('lnd')
        .controller('ForgotPasswordController', ForgotPasswordController);

    ForgotPasswordController.$inject = ['usersService'];

    function ForgotPasswordController(usersService) {
        var vm = this;

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



    }

})();