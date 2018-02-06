(function(){
    'use strict';

    angular
        .module('lnd')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('dashboard.editevent', {
                    url:'/editevent/:eventId',
                    templateUrl: 'dashboard/events/event-manage/event-manage.html',
                    controller: 'DashboardEditEventController',
                    controllerAs: 'vm'
                })
        }])
})();



