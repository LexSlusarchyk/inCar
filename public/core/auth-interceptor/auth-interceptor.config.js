(function () {
    'use strict';

    angular
        .module('lnd')
        .config(authInterceptorConfigure);

    authInterceptorConfigure.$inject = ['$httpProvider'];

    function authInterceptorConfigure($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }
})();