(function() {
    'use strict';

    angular
        .module('lnd')
        .factory('modalService', modalService);

    modalService.$inject = ['$q', '$uibModal', '$uibModalStack'];

    function modalService($q, $uibModal, $uibModalStack) {
    	var defer;
    	var service = {
    		showAddSubcatModal: showAddSubcatModal,
            showEditSubcatModal: showEditSubcatModal,
            showAddNewsCatModal: showAddNewsCatModal,
            showEditNewsCatModal: showEditNewsCatModal,
    		confirmCreation: confirmCreation,
            showAddTicketModal: showAddTicketModal,
            confirmTicketCreation: confirmTicketCreation,
            showAddLocationModal: showAddLocationModal,
            showEditLocationModal: showEditLocationModal
    	};

    	return service;

    	function showAddSubcatModal(parentCat) {
    		defer = $q.defer();
	        var modalInstance = $uibModal.open({
	            animation: true,
	            templateUrl: 'layout/modals/cat-manage-modal/cat-manage-modal.html',
	            controller: 'createCatModalController',
	            controllerAs: 'vm',
	            size: 'md',
	            resolve: {
	                parentCat: function() {
	                    return parentCat;
	                }
	            }
	        });
	        return defer.promise;
        }

        function showAddNewsCatModal() {
            defer = $q.defer();
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'layout/modals/cat-manage-modal/cat-manage-modal.html',
                controller: 'CreateNewsCatModalController',
                controllerAs: 'vm',
                size: 'md'
            });
            return defer.promise;
        }

        function showEditSubcatModal(cat) {
            defer = $q.defer();
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'layout/modals/cat-manage-modal/cat-manage-modal.html',
                controller: 'editCatModalController',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    cat: function() {
                        return cat;
                    }
                }
            });
            return defer.promise;
        }

        function showEditNewsCatModal(cat) {
            defer = $q.defer();
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'layout/modals/cat-manage-modal/cat-manage-modal.html',
                controller: 'EditNewsCatModalController',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    cat: function() {
                        return cat;
                    }
                }
            });
            return defer.promise;
        }

        function confirmCreation(response) {
        	defer.resolve(response)
            $uibModalStack.dismissAll();
        }

        function showAddTicketModal(eventId) {
            defer = $q.defer();
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'layout/modals/ticket-manage-modal/ticket-manage-modal.html',
                controller: 'CreateTicketModalController',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    eventId: function() {
                        return eventId;
                    }
                }
            });

            return defer.promise;
        }


        function showAddLocationModal(parentLocation) {
            defer = $q.defer();
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'layout/modals/country-manage-modal/country-manage-modal.html',
                controller: 'CreateLocationModalController',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    parentLocation: function() {
                        return parentLocation;
                    }
                }
            });
            return defer.promise;
        }

        function showEditLocationModal(location) {
            defer = $q.defer();
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'layout/modals/country-manage-modal/country-manage-modal.html',
                controller: 'EditLocationModalController',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    location: function() {
                        return location;
                    }
                }
            });
            return defer.promise;
        }


        function confirmTicketCreation(response) {
            defer.resolve(response);
            $uibModalStack.dismissAll();
        }

    }

    

})();
