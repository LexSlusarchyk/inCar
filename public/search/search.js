'use strict';

angular.module('lnd')


.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
        .state('search', {
            url:'/search',
            templateUrl: 'search/search.html',
            controller: 'SearchController'
        })
}])

.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization,places'
    });
})

.controller('SearchController', ['$scope', 'uiGmapGoogleMapApi', function($scope, uiGmapGoogleMapApi) {
	$scope.map = { center: { latitude: 52.47491894326404, longitude: -1.8684210293371217 }, zoom: 15};
	$scope.marker = {
	    id: 0,
	    coords: {
	        latitude: 52.47491894326404,
	        longitude: -1.8684210293371217
	    }
	};
	

	$scope.searchbox = { template: 'partials/searchbox.tpl.html'};
	$scope.searchbox.parentdiv = 'search-input';
	$scope.googleMap = {};

	$scope.searchbox.events = {
	    places_changed: function (searchBox) {
	        var place = searchBox.getPlaces();
	       
	        $scope.event.location = {
	        	formatted_address: place.formatted_address,
	        	latitude: place[0].geometry.location.lat(),
	        	longitude: place[0].geometry.location.lng()
	        }


	        if (!place || place == 'undefined' || place.length == 0) {
	            console.log('no place data :(');
	            return;
	        }

	        $scope.map = {
	            "center": {
	                "latitude": place[0].geometry.location.lat(),
	                "longitude": place[0].geometry.location.lng()
	            },
	            "zoom": 15
	        };
	        
	        $scope.marker = {
	            id: 0,
	            coords: {
	                latitude: place[0].geometry.location.lat(),
	                longitude: place[0].geometry.location.lng()
	            }
	        };
	    }
	};

}])

