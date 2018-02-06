(function () {
    'use strict';
    angular
        .module('lnd')
        .controller('DashboardTextsController', DashboardTextsController);

    DashboardTextsController.$inject = ['$stateParams', 'textsService'];

    function DashboardTextsController($stateParams, textsService) {
        var vm = this;
        var type = $stateParams.type;

        vm.updateText = updateText;

        activate();

        function activate() {
            getText();
        }

        function getText() {
            textsService.getText(type).then(function(response) {
                vm.text = response.data.markup;
            })
        }

        function updateText() {
            textsService.updateText(vm.text, type).then(function(response) {
                alert('Updated Successfully')
            })
        }

    }
})();


