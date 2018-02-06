(function () {
    'use strict';

    angular
        .module('lnd')
        .controller('confirmModalController', confirmModalController);


    confirmModalController.$inject = ['$scope', 'message', 'modalService', 'confirmService'];
   
    function confirmModalController($scope, message, modalService, confirmService) {
        var vm = this;
        vm.message = message;
        vm.respond = respond;

        
        function respond(response) {
           confirmService.resolve(response);
        };

    }



})();
