(function () {
    'use strict';
    angular
        .module('lnd')
        .controller('PokupoController', PokupoController);

    PokupoController.$inject = ['$q', '$stateParams', '$state', 'eventsService', 'paymentService', 'usersService', 'confirmService'];

    function PokupoController($q, $stateParams, $state, eventsService, paymentService, usersService, confirmService) {
        var vm = this;

        var SHOP_ID = 7582;
        var ticketId = parseInt($stateParams.ticketId);


        vm.submit = submit;
        vm.getRubPrice = getRubPrice;

        activate();

        function activate() {
            getTicketInfo();
        }

        function getTicketInfo() {
            eventsService.getTicket(ticketId).then(function(data) {
                vm.ticket = data.data;
                getRubPrice(vm.ticket.price);

                eventsService.getEvent(vm.ticket.eventId).then(function(data) {
                    vm.event = data.data;
                });
            });
        }

        function getParams() {
            var defer = $q.defer();

            if (!usersService.data || !usersService.data.userData || !vm.event || !vm.ticket) {
                var message = 'You need to be logged in in order to buy tickets.';
                confirmService.openAlertModal(message);
                return defer.reject(false);
            }

            var params = {
                idShop: SHOP_ID,
                amount: eventsService.usdToRub(vm.ticket.price),
                description: 'Event ticket for ' + vm.event.name + " (InCar Online)",
                mailUser: usersService.data.userData.email
            };

            reserveTicket().then(function(response) {
                params.uid = response.token;
                defer.resolve(params);
            });

            return defer.promise;
        }

        function formUrl() {
            var defer = $q.defer();

            getParams().then(function(params) {
                if (!params) {
                    defer.reject(false);
                    return false;
                }

                var baseLocation = 'https://pokupo.ru/payment/' + params.idShop + '/payment/#//amount=';

                var url = baseLocation + vm.rubPrice +
                    '&description=' + params.description +
                    '&mailUser=' + params.mailUser +
                    '&uid=' + params.uid;

                defer.resolve(url);
            });

            return defer.promise;
        }

        function reserveTicket() {
            var options = {
                userId: usersService.data.userData.id,
                ticketId: vm.ticket.id
            };

            return paymentService.pokupoReserve(options);
        }

        function submit() {
            formUrl().then(function(url) {
                if (!url) { return false; }
                window.location = url;
            });
        }

        function getRubPrice(usdPrice) {
            if (!usdPrice) { return ''; }

            eventsService.usdToRub(usdPrice).then(function(response) {
                var rates = response.data.rates;
                var rubPriceRaw = (usdPrice / rates.USD) * rates.RUB;

                vm.rubPrice = Math.floor(rubPriceRaw * 100) / 100;
            });
        }

    }
})();