(function () {
    'use strict';
    angular
        .module('lnd')
        .controller('TextsController', TextsController);

    TextsController.$inject = ['textsService', '$stateParams'];

    function TextsController(textsService, $stateParams) {
        var vm = this;
        var textId = $stateParams.id;

        activate();

        function activate() {
            if (!textId) { return false; }
            textsService.getText(textId).then(function(response) {
                vm.text = response.data.markup;
            });
        }
    }
})();