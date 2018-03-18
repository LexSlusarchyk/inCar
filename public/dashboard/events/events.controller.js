(function () {
    'use strict';
    angular
        .module('lnd')
        .controller('DashboardEventsController', DashboardEventsController);

    DashboardEventsController.$inject = ['$state', 'categoriesService', 'eventsService', 'confirmService'];

    function DashboardEventsController($state, categoriesService, eventsService, confirmService) {
        var vm = this;

        vm.config = {
            editCatsVisible: false,
            addEventButtonVisible: true,
            filterCat: null
        };

        vm.fixEvent = fixEvent;
        vm.editEvent = editEvent;
        vm.removeEvent = removeEvent;
        vm.filter = customFilter;

        activate();

        function activate() {
            categoriesService.getCatsList().then(function(data){
                vm.cats = data.data;
            });

            eventsService.getEvents().then(function (data) {
                vm.events = data.data;
            });
        }

        function editEvent(event) {
            $state.go('dashboard.editevent', {"eventId": event.id});
        }

        function removeEvent(event, index) {
            var message = "Are you sure you want to delete event " + event.name + "?";
            confirmService.openConfirmModal(message).then(function(response){
                if (response) {
                    eventsService.removeEvent(event.id);
                    vm.events.splice(index, 1);
                }
            })
        }

        function fixEvent(event){
            eventsService.fixEvent({isFixed : event.isFixed, id : event.id}).then(function (data) {
                $state.go('dashboard.events');
            });
            event.isFixed = !event.isFixed;
        }

        function customFilter(actual) {
            if (vm.config.filterCat) {
                return parseInt(actual.catId) === parseInt(vm.config.filterCat);
            }

            return true;
        }
    }
})();


