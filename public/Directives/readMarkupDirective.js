
(function () {
    'use strict';

    angular
        .module('lnd')
        .directive('readMarkup', readMarkup);

    readMarkup.$inject = [];
    /* @ngInject */
    function readMarkup() {
        var directive = {
            bindToController: true,
            controller: ReadMarkupController,
            replace: true,
            templateUrl: 'templates/read-markup.html',
            controllerAs: 'vm',
            restrict: 'E',
            scope: {
                markup: '='
            }
        };

        return directive;
    }

    ReadMarkupController.$inject = ['$sce', '$scope'];
    /* @ngInject */
    function ReadMarkupController($sce, $scope) {
        var vm = this;

        $scope.$watch('vm.markup', function(newV, oldV) {
            if (newV) {
                vm.markupToSHow = $sce.trustAsHtml(vm.markup);
            }
        });
    }
})();