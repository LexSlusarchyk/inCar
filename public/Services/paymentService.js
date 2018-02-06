(function() {
    'use strict';

    angular
        .module('lnd')
        .factory('paymentService', paymentService);

    paymentService.$inject = ['$q', '$http', 'globalConfig'];
    /* @ngInject */
    function paymentService($q, $http, globalConfig) {

        var apiUrl = globalConfig.apiUrl;

        var service = {
            getBraintreeClient: getBraintreeClient,
            createTransaction: createTransaction,
            createSecurionTransaction: createSecurionTransaction,
            pokupoReserve: pokupoReserve
        };

        return service;


        function getBraintreeToken() {
            var defer = $q.defer();
            $http.get(apiUrl + '/api/payment/client-token').then(function(data){
                defer.resolve(data.data);
            });
            return defer.promise;
        }


        function getBraintreeClient() {
            var defer = $q.defer();

            getBraintreeToken().then(function(data){
                braintree.client.create({
                    authorization: data,
                }, 
                function (clientErr, clientInstance) {
                    if (clientErr) {
                        return;
                    }

                    var options = {
                        client: clientInstance,
                        styles: {
                        'input': {
                            'font-size': '16px',
                            'color': '#3A3A3A'
                        },

                        // Styling a specific field
                        '.number': {
                            'font-family': 'monospace'
                        },

                        // Styling element state
                        ':focus': {
                            'color': 'blue'
                        },
                        '.valid': {
                            'color': 'green'
                        },
                        '.invalid': {
                            'color': 'red'
                        }
                        },
                        fields: {
                            number: {
                                selector: '#card-number',
                                placeholder: '1111 1111 1111 1111'
                            },
                            cvv: {
                                selector: '#cvv',
                                placeholder: '123'
                            },
                            expirationDate: {
                                selector: '#expiration-date',
                                placeholder: '10 / 2019'
                            }
                        }
                    };

                    braintree.hostedFields.create(options, function (hostedFieldsErr, hostedFieldsInstance) {
                        if (hostedFieldsErr) {
                          return;
                        }

                        defer.resolve(hostedFieldsInstance);
                    });
                })
            });

            return defer.promise
        }

        function createSecurionTransaction(paymentOptions) {
            var defer = $q.defer();

            $http.post(apiUrl + '/api/payment/securion', paymentOptions).then(function(data){
                defer.resolve(data.data);
            });

            return defer.promise;
        }


        function createTransaction(paymentOptions) {
            var defer = $q.defer();

            $http
                .post(apiUrl + '/api/payment/pay', paymentOptions).then(function(data){
                    defer.resolve(data.data);
                })
                .catch(function(err) {
                    defer.reject(err);
                });

            return defer.promise;
        }

        function pokupoReserve(paymentOptions) {
            var defer = $q.defer();
            $http
                .post(apiUrl + '/api/payment/pokupo-reserve', paymentOptions).then(function(data){
                    defer.resolve(data.data);
                })
                .catch(function(err) {
                    defer.reject(err);
                });

            return defer.promise;
        }

    }
})();