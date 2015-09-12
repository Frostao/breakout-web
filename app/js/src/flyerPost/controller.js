var app = angular.module('breakout.flyerPost', ['breakoutApp']);

app.controller('flyerPostController', ['$scope', 'eventService', '$http', function($scope, eventService, $http) {
	$scope.newEvent = {title: ""}
	$scope.locations;


	$scope.add = function(){
	  var f = document.getElementById('file').files[0],
	      r = new FileReader();
	  r.onloadend = function(e){
	    var data = e.target.result;
	    //send you binary data via $http or $resource or do anything else with it
	  }

	  $scope.newEvent.flyer = new Parse.File("flyer.jpeg", f);;
	}

	$scope.createEvent = function(newEvent) {
		newEvent.date.setTime($scope.time);
		console.log($scope.selectedLocation);
		console.log($scope.selectedLocation.lat);
		console.log($scope.selectedLocation.lng);
		newEvent.location = new Parse.GeoPoint($scope.selectedLocation.lat, $scope.selectedLocation.lng);
		console.log(newEvent);
		eventService.createEvent(newEvent);
	}

	$scope.search = function(searchString) {
		var url = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDe8sRSaGxnJ2h4X1DZfA9W5ee2XGWfO5k&address=";
		url += searchString;
		url = encodeURI(url);
		
		$http.get(url).
			then(function(response) {
				$scope.locations = response.data.results;
				console.log(response);
			}, function(response) {
				console.log(response);
			});
	}
}]);

