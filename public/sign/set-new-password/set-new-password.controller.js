(function () {
    'use strict';
    angular
        .module('lnd')
        .controller('SetNewPasswordController', SetNewPasswordController)

    SetNewPasswordController.$inject = ['$scope', '$stateParams', '$http', 'globalConfig'];

    function SetNewPasswordController($scope, $stateParams, $http, globalConfig) {
        var vm = this;
        var token = $stateParams.tok;
        console.log(token);
        var apiUrl = globalConfig.apiUrl;
        var query = apiUrl + '/api/users/activate/' + token;

        $http.get(query).then(function(response){
            if (response.data && response.data.success) {
                vm.success = true;
            } else {
                vm.fail = true;
            }
        });

    }
})();