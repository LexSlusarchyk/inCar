(function () {
    'use strict';
    angular
        .module('lnd')
        .controller('TextsController', TextsController);

    TextsController.$inject = ['$rootScope', 'translateService', 'textsService', '$stateParams'];

    function TextsController($rootScope, translateService, textsService, $stateParams) {
        var vm = this;
        var textId = $stateParams.id;

        activate();

        function activate() {
            if (!textId) { return false; }

            var userLang = translateService.getLocalStorageData();
            var setLang = (userLang === "RU") ? userLang : "";
            var textIdLang = $stateParams.id + setLang.toLowerCase();

            textsService.getText(textIdLang).then(function(response) {
                vm.text = response.data.markup;
            });
        }

        $rootScope.$on('lang-changed', function() {
            activate();
        });
    }
})();