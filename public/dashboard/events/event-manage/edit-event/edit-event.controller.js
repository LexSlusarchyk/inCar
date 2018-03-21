(function () {
    'use strict';
    angular
        .module('lnd')
        .controller('DashboardEditEventController', DashboardEditEventController);

    DashboardEditEventController.$inject = ['$stateParams', '$state', 'eventsService', 'geographyService', 'modalService'];

    function DashboardEditEventController($stateParams, $state, eventsService, geographyService, modalService) {
        var vm = this;

        var formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];

        vm.cropperConfig = {
            aspectRatio: 16 / 10,
            resizeTo: 700
        };

        vm.event = {};
        vm.popup1 = {
            opened: false
        };
        vm.selectedLocations = [];

        vm.editEventView = true;

        vm.eventId = parseInt($stateParams.eventId);
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
        vm.openTicketCreateModal = openTicketCreateModal;
        vm.removeTicket = removeTicket;
        vm.stopSale = stopSale;

        activate();

        function activate() {
            getLocations();
        }

        function getLocations() {
            geographyService.getLocations().then(function(data) {
                vm.locations = data.data;
                getEvent();
            });
        }

        function getEvent() {
            eventsService.getEvent(vm.eventId).then(function(data) {
                vm.event = data.data;
                vm.event.date = new Date(data.data.date);
                setEventLocation(vm.event.latitude, vm.event.longitude);
                vm.multiselectConfig = {
                    propToCheck: 'id',
                    preselected: [vm.event.country, vm.event.town]
                }
            });
        }

        function setEventLocation(latitude, longitude) {
            vm.map = { center: { latitude: latitude, longitude: longitude }, zoom: 15};

            vm.marker = {
                id: 0,
                coords: {
                    latitude: latitude,
                    longitude: longitude
                }
            };
            getEventSubscriptions();
        }

        function getEventSubscriptions() {
            eventsService.getBoughtTicketsByEventId(vm.event.id).then(function(response) {
                console.log(response);
                vm.subscriptions = response.data;
            })
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

            eventsService.updateEvent(event).then(function (data) {
                $state.go('dashboard.events');
            });
        }

        function openTicketCreateModal() {
            modalService.showAddTicketModal(vm.event.id).then(function(data){
                var ticket = data;
                ticket.eventName = vm.event.name;
                ticket.eventImgUrl = vm.event.imageUrl;

                eventsService.createTicket(ticket).then(function(data) {
                    if (!vm.event.tickets) {
                        vm.event.tickets = [];
                    }
                    vm.event.tickets.push(data.data);
                })
            })
        }

        function stopSale(index) {
            var ticket = vm.event.tickets[index];
            var params = {};
            params.id = ticket.id;
            params.notAvailable = ticket.notAvailable;

            console.log(params);

            eventsService.stopSale(params).then(function(data) {
                console.log('Sale stoped!');
            })
            vm.event.tickets[index].notAvailable = !vm.event.tickets[index].notAvailable; //for ng-if in ticket-item.html
            console.log(ticket);
        }

        function removeTicket(index) {
            var ticket = vm.event.tickets[index];

            if (vm.event.tickets[index].id) {
                eventsService.deleteTicket(ticket.id).then(function(data) {
                    vm.event.tickets.splice(index, 1);
                })
            } else {
                vm.event.tickets.splice(index, 1);
            }
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

