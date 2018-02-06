(function () {
    'use strict';

    angular
        .module('lnd')
        .controller('RulesConfirmModalController', RulesConfirmModalController);


    RulesConfirmModalController.$inject = ['type', 'confirmService', 'textsService'];

    function RulesConfirmModalController(type, confirmService, textsService) {
        var vm = this;
        vm.type = type;
        vm.respond = respond;

        activate();

        function activate() {
            textsService.getText(vm.type).then(function(response){
                vm.markup = response.data.markup
            })
        }

        function respond(response) {
            confirmService.resolve(response);
        }

    }



})();
