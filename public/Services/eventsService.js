(function() {
    'use strict';

    angular
        .module('lnd')
        .factory('eventsService', eventsService);

    eventsService.$inject = ['$q', '$http', 'globalConfig'];
    /* @ngInject */
    function eventsService($q, $http, globalConfig) {
        var apiUrl = globalConfig.apiUrl;

        var service = {
            getEvent: getEvent,
            getEvents: getEvents,
            getLastEvents: getLastEvents,
            getFixedEvents: getFixedEvents,
            createEvent: createEvent,
            removeEvent: removeEvent,
            fixEvent: fixEvent,
            updateEvent: updateEvent,
            createTicket: createTicket,
            getTickets: getTickets,
            getBoughtTickets: getBoughtTickets,
            getBoughtTicketsByEventId: getBoughtTicketsByEventId,
            getTicket: getTicket,
            getUserTickets: getUserTickets,
            updateTicket: updateTicket,
            deleteTicket: deleteTicket,
            stopSale: stopSale,
            usdToRub: usdToRub
        };

        return service;

        function getEvents(catId) {
            var defered = $q.defer();
            var query;
            if (catId) {
                query = apiUrl + '/api/events/category/' + catId;
            } else {
                query = apiUrl + '/api/events/list';
            }
            
            $http.get(query).then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }

        function getLastEvents() {

            var defered = $q.defer();
            var query = apiUrl + '/api/events/last';


            $http.get(query).then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }

        function getFixedEvents() {

            var defered = $q.defer();
            var query = apiUrl + '/api/events/fixed';


            $http.get(query).then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }

        function getEvent(id) {
            var defered = $q.defer();
            var query = apiUrl + '/api/events/' + id;
            
            $http.get(query).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function createEvent(event) {
            var defered = $q.defer();
            var query = apiUrl + '/api/events';
            $http.post(query, event).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }


        function removeEvent(id) {
           var defered = $q.defer();
            var query = apiUrl + '/api/events/' + id;
            
            $http.delete(query).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function fixEvent(params) {
            var defered = $q.defer();
            var query = apiUrl + '/api/events/event/' + params.id;
            $http.put(query, params).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function updateEvent(event) {
            var defered = $q.defer();
            var query = apiUrl + '/api/events/' + event.id;
            var responseBody = globalConfig.filterFalseKeys(event);
            
            $http.put(query, responseBody).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function createTicket(ticket) {
            var defered = $q.defer();
            var query = apiUrl + '/api/events/tickets';
            
            $http.post(query, ticket).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function getTicket(ticketId) {
            var defered = $q.defer();
            var query = apiUrl + '/api/events/tickets/ticket/' + ticketId;
            
            $http.get(query).then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }

        function getTickets(eventId) {
            var defered = $q.defer();
            var query = apiUrl + '/api/events/tickets/' + eventId;
            
            $http.get(query).then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }

        function getBoughtTickets() {
            var defered = $q.defer();
            var query = apiUrl + '/api/boughttickets';

            $http.get(query).then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }

        function getBoughtTicketsByEventId(eventId) {
            var defered = $q.defer();
            var query = apiUrl + '/api/boughttickets/' + eventId;

            $http.get(query).then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }

        function getUserTickets(userId) {
            var defered = $q.defer();
            var query = apiUrl + '/api/tickets/' + userId;
            
            $http.get(query).then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }

        function updateTicket(ticket) {
            var defered = $q.defer();
            var query = apiUrl + '/api/events/tickets/' + ticket.id;
            
            $http.put(query, ticket).then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }

        function deleteTicket(ticketId) {
            var defered = $q.defer();
            var query = apiUrl + '/api/events/tickets/' + ticketId;

            $http.delete(query).then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }

        function stopSale(params) {
            var defered = $q.defer();
            var query = apiUrl + '/api/events/tickets/ticket/' + params.id;

            $http.put(query, params).then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }

        function usdToRub(usdAmount) {
            var defered = $q.defer();
            var query = 'http://api.fixer.io/latest';

            $http.get(query).then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }

    }
})();