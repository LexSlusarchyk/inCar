(function () {
    'use strict';
    angular
        .module('lnd')
        .controller('SetNewPasswordController', SetNewPasswordController)

    SetNewPasswordController.$inject = ['$rootScope', 'translateService', '$scope', '$stateParams', '$http', 'globalConfig', 'usersService', '$state'];

    function SetNewPasswordController($rootScope, translateService, $scope, $stateParams, $http, globalConfig, usersService, $state) {
        var vm = this;
        vm.submit = submit;
        vm.profile = translateService.data.lang['profile'];

        var token = $stateParams.tok;
        vm.credentials = {};
        vm.credentials.token = token;



        $rootScope.$on('lang-changed', function() {
            vm.profile = translateService.data.lang['profile'];
        });


        function submit() {

            console.log(vm.credentials);

            usersService.setNewPassword(vm.credentials).then(function(response){
                console.log(vm.credentials);

                if (response.data && response.data.code === "ER_DUP_ENTRY") {
                    vm.duplicateError = true;
                } else {
                    alert('Succes! Password changed, you can now login with new password.');
                    $state.go('sign.in');
                }

            });
        }

    }
})();