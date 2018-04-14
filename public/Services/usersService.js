(function() {
    'use strict';

    angular
        .module('lnd')
        .factory('usersService', usersService);

    usersService.$inject = ['$q', '$http', 'globalConfig', 'geographyService'];
    /* @ngInject */
    function usersService($q, $http, globalConfig, geographyService) {

       var apiUrl = globalConfig.apiUrl;

        var service = {
            data: {
                userData: {}
            },
            signUp: signUp,
            signIn: signIn,
            signOut: signOut,
            updateProfile: updateProfile,
            getUsersList: getUsersList,
            getUser: getUser,
            requestPasswordChange: requestPasswordChange,
            setNewPassword: setNewPassword
        };

        getLocalStorageData();

        return service;

        function signIn(credentials) {
            var defered = $q.defer();
            $http.post(apiUrl + '/api/users/login', credentials).then(
                function(data){
                    var userData = data.data.userData;
                    var token = data.data.token;
                    service.data.userData = userData;
                    setLocalStorageData(userData, token);
                    setGeographyData(userData);
                    defered.resolve(data);
                },
                function(err) {
                    defered.reject(err);
                }

            );
            return defered.promise;
        }

        function setGeographyData(user) {
            geographyService.currentCountry = user.country;
            geographyService.currentRegion = user.region;
        }

        function signOut() {
            clearUserData();
        }

        function signUp(credentials) {
            var defered = $q.defer();
            $http.post(apiUrl + '/api/users/signup', credentials).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function requestPasswordChange(email) {
            var defered = $q.defer();
            $http.post(apiUrl + '/api/users/reset', {email: email}).then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }

        function setNewPassword(credentials) {
            var defered = $q.defer();
            $http.post(apiUrl + '/api/users/password', credentials).then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }



        function updateProfile(userData) {
            var defered = $q.defer();
            $http.put(apiUrl + '/api/users', userData).then(function(data){
                defered.resolve(data);
                service.data.userData = userData;
                setGeographyData(userData);
            });
            return defered.promise;
        }

        function getUsersList(credentials) {
            var defered = $q.defer();
            $http.get(apiUrl + '/api/users/list', credentials).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function getUser(id) {
            var  defered = $q.defer();
            $http.get(apiUrl + '/api/users/' + id).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function setLocalStorageData(userData, token) {
            if (userData) {
                localStorage.setItem('userData', JSON.stringify(userData))
            }
            if (token) {
                localStorage.setItem('token', token)
            }
        }

        function getLocalStorageData() {
            var storedData = JSON.parse(localStorage.getItem('userData'));
            var userData = storedData ? storedData : null; 
            service.data.userData = userData;
            // return userData;
        }

        function clearUserData() {
            service.data.userData = null;
            localStorage.removeItem('userData');
            localStorage.removeItem('token');
        }

    }
})();