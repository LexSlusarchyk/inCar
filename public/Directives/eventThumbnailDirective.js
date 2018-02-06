(function () {
    'use strict';

    angular
        .module('lnd')
        .directive('eventThumbnail', eventThumbnail);

    eventThumbnail.$inject = [];
    /* @ngInject */
    function eventThumbnail() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: EventThumbnailController,
            controllerAs: 'vm',
            restrict: 'E',
            templateUrl: 'templates/event-thumbnail.html',
            scope: {
                event: '=',
                index: '='
            }
        };

        return directive;
    }

    EventThumbnailController.$inject = ['categoriesService'];
    /* @ngInject */
    function EventThumbnailController(categoriesService) {
        var vm = this;

        vm.formatEventDate = formatEventDate;

        activate();

        function activate() {
            categoriesService.getCat(vm.event.catId).then(function(response){
                vm.event.cat = response.data.name;
            });
        }

        function formatEventDate() {
            var dd = moment(vm.event.date).startOf('day').fromNow();
            return dd;
        }

    }
})();

