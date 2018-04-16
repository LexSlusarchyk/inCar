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

.controller('SignController', ['$rootScope', '$scope', '$location', function($rootScope, $scope, $location) {

}])

.controller('SignInController', ['$rootScope', 'translateService', '$scope', '$http', '$state', '$location', 'usersService',
    function($rootScope, translateService, $scope, $http, $state, $location, usersService) {
        var vm = this;
        vm.credentials = {};
        vm.profile = translateService.data.lang['profile'];

        vm.login = login;
        vm.onInputChange = onInputChange;


        activate();

        function activate() {
            $rootScope.$on('lang-changed', function() {
                vm.profile = translateService.data.lang['profile'];
            })

        }

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

.controller('SignUpController', ['$rootScope', '$scope', '$location', '$state', 'usersService', 'translateService', function($rootScope, $scope, $location, $state, usersService, translateService) {
    var vm = this;

    vm.credentials = {};
    vm.signUp = signUp;
    vm.onInputChange = onInputChange;
    vm.profile = translateService.data.lang['profile'];

    activate();

    function activate() {
        $rootScope.$on('lang-changed', function() {
            vm.profile = translateService.data.lang['profile'];
        })
    }

     function signUp(credentials) {
        vm.credentials.isActivated = 1;
        usersService.signUp(credentials).then(function(response){
            console.log(response);
            if (response.data && response.data.code === "ER_DUP_ENTRY") {
                vm.duplicateError = true;
            } else {
                alert('We are glad you have chosen to be a part of our community and we hope you enjoy your stay. Now you can start to use our services by going to events section of  website. Thank you for registering with us.');
                $state.go('sign.in');
            }

        });
    }

    function onInputChange() {
        vm.duplicateError = false;
    }
}]);
