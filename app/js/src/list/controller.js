var app = angular.module('breakout.list', ['breakoutApp']);

app.controller('listController', ['$scope', 'Event', '$http', function($scope, Event, $http) {
 	Event.getEvents().then(function(results) {
		//console.log(results);
		$scope.events = results;
	}, function(error) {
		console.log(error);
	});

	$scope.coodToName = function(tuple) {
		$http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+tuple.latitude+","+tuple.longitude+"&key=AIzaSyDe8sRSaGxnJ2h4X1DZfA9W5ee2XGWfO5k")
    	.success(function(response) {
    		return response.data[0].formatted_address;
    	});	
	}
 	
}]);
