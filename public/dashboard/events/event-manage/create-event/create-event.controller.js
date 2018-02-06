(function () {
    'use strict';
    angular
        .module('lnd')
        .controller('DashboardAddEventController', DashboardAddEventController);

    DashboardAddEventController.$inject = ['$stateParams', '$state', 'eventsService', 'geographyService'];

    function DashboardAddEventController($stateParams, $state, eventsService, geographyService) {
        var vm = this;

        var formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];

        vm.event = {};
        vm.popup1 = {
            opened: false
        };
        vm.selectedLocations = [];

        vm.cropperConfig = {
            aspectRatio: 16 / 10,
            resizeTo: 700
        };

        vm.event.catId = parseInt($stateParams.catId);
        vm.minDate = new Date();
        vm.map = { center: { latitude: 52.47491894326404, longitude: -1.8684210293371217 }, zoom: 15};
        vm.marker = {
            id: 0,
            coords: {
                latitude: 52.47491894326404,
                longitude: -1.8684210293371217
            }
        };
        vm.searchbox = { template: 'partials/searchbox.tpl.html'};
        vm.searchbox.parentdiv = 'search-input';
        vm.googleMap = {};

        vm.format = formats[0];

        vm.searchbox.events = {
            places_changed: function (searchBox) {
                var places = searchBox.getPlaces();

                if (!places || places == 'undefined' || places.length == 0 || !places[0].geometry) {
                    console.log('no place data :(');
                    return;
                }

                vm.event.latitude = places[0].geometry.location.lat();
                vm.event.longitude = places[0].geometry.location.lng();
                vm.event.fullAddress = places[0].formatted_address;
                vm.map = {
                    "center": {
                        "latitude": places[0].geometry.location.lat(),
                        "longitude": places[0].geometry.location.lng()
                    },
                    "zoom": 15
                };
                vm.marker = {
                    id: 0,
                    coords: {
                        latitude: places[0].geometry.location.lat(),
                        longitude: places[0].geometry.location.lng()
                    }
                };
            }
        };

        vm.dateOptions = {
            minDate: new Date(),
            showWeeks: true
        };

        vm.timepickerConfig = {
            hstep: 1,
            mstep: 1,
            isMeridian: false
        };

        vm.today = today;
        vm.openDatepicker = openDatepicker;
        vm.onTimepickerChange = onTimepickerChange;
        vm.saveEvent = saveEvent;

        activate();

        function activate() {
            getLocations();
            vm.today();
        }

        function getLocations() {
            geographyService.getLocations().then(function(data) {
                vm.locations = data.data;
            });
        }

        function today() {
            vm.event.date = new Date();
        }

        function openDatepicker() {
            vm.popup1.opened = true;
        }

        function onTimepickerChange() {

        }

        function saveEvent(event) {
            var locations = getEventLocations();

            if (locations[0]) {
                event.country = locations[0];
            }

            if (locations[1]) {
                event.town = locations[1];
            }

            eventsService.createEvent(event).then(function (data) {
                $state.go('dashboard.events');
            });
        }

        function getEventLocations() {
            var locationsList = [];
            _.each(vm.selectedLocations, function(elem) {
                locationsList.push(elem.id);
            });

            return locationsList;
        }
    }
})();


