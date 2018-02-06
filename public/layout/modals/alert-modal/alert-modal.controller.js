(function () {
    'use strict';

    angular
        .module('lnd')
        .controller('AlertModalController', AlertModalController);


    AlertModalController.$inject = ['$scope', 'message', 'modalService', 'confirmService'];

    function AlertModalController($scope, message, modalService, confirmService) {
        var vm = this;
        vm.message = message;
        vm.respond = respond;


        function respond(response) {
            confirmService.resolve(response);
        }

    }



})();
