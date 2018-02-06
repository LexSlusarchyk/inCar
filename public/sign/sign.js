'use strict';

angular.module('lnd')

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
        .state('sign', {
            abstract: true,
            templateUrl: 'sign/sign.html',
            controller: 'SignController'
        })
        .state('sign.in', {
            url:'/signin',
            templateUrl: 'sign/signin.html',
            controller: 'SignInController',
            controllerAs: 'vm'
        })
        .state('sign.up', {
            url:'/signup',
            templateUrl: 'sign/signup.html',
            controller: 'SignUpController',
            controllerAs: 'vm'
        })

}])

.controller('SignController', ['$scope', '$location', function($scope, $location) {
    
    
}])

.controller('SignInController', ['$rootScope', '$scope', '$http', '$state', '$location', 'usersService',
    function($rootScope, $scope, $http, $state, $location, usersService) {
        var vm = this;
        vm.credentials = {};

        vm.login = login;
        vm.onInputChange = onInputChange;

        function login(credentials) {
            usersService.signIn(credentials).then(
                function(data){
                    var userId = data.data.userData.id;
                    $state.go('profile', {id: userId});
                    $rootScope.$emit('user-logged-in');
                },
                function() {
                    vm.error = 'No user with such email and password.'
                }
            );
        }

        function onInputChange() {
            vm.error = '';
        }
    }])

.controller('SignUpController', ['$scope', '$location', '$state', 'usersService', function($scope, $location, $state, usersService) {
    var vm = this;

    vm.credentials = {};
    vm.signUp = signUp;
    vm.onInputChange = onInputChange;

     function signUp(credentials) {
        usersService.signUp(credentials).then(function(response){
            console.log(response);
            if (response.data && response.data.code === "ER_DUP_ENTRY") {
                vm.duplicateError = true;
            } else {
                $state.go('sign.in');
            }

        });
    }

    function onInputChange() {
        vm.duplicateError = false;
    }
}]);