(function() {
    'use strict';

    angular
        .module('lnd')
        .factory('confirmService', confirmService);

    confirmService.$inject = ['$q', '$uibModal', '$uibModalStack'];

    function confirmService($q, $uibModal, $uibModalStack) {
    	var defer;
    	var service = {
    		openConfirmModal: openConfirmModal,
            openRulesConfirmModal: openRulesConfirmModal,
            openAlertModal: openAlertModal,
    		resolve: resolve
    	};

    	return service;

    	function openConfirmModal(message) {
            defer = $q.defer();
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'layout/modals/confirm-modal/confirm-modal.html',
                controller: 'confirmModalController',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    message: function() {
                        return message;
                    }
                }
            });
            return defer.promise;
    	}


        function openRulesConfirmModal(type) {
            defer = $q.defer();
            var rulesInstance = $uibModal.open({
                animation: true,
                templateUrl: 'layout/modals/rules-confirm-modal/rules-confirm-modal.html',
                controller: 'RulesConfirmModalController',
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                    type: function() {
                        return type;
                    }
                }
            });
            return defer.promise;
        }

        function openAlertModal(message) {
            defer = $q.defer();
            var rulesInstance = $uibModal.open({
                animation: true,
                templateUrl: 'layout/modals/alert-modal/alert-modal.html',
                controller: 'AlertModalController',
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                    message: function() {
                        return message;
                    }
                }
            });
            return defer.promise;
        }

    	
        function resolve(response) {
        	defer.resolve(response);
            $uibModalStack.dismissAll();
        }



    }

})();
