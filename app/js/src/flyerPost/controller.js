var app = angular.module('breakout.flyerPost', ['breakoutApp']);

app.controller('flyerPostController', ['$scope', 'eventService', '$http', function($scope, eventService, $http) {
	$scope.newEvent = {title: ""}
	$scope.locations;
	$scope.selectedLocation = null;

	$scope.getSelectedLocation = function(location, address) {
		$scope.selectedLocation = location;
		$scope.searchString = address;
	}
	
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
		$scope.add();

		console.log($scope.time);
		newEvent.placename = $scope.searchString;
		newEvent.date.setHours($scope.time.getHours());
		newEvent.date.setMinutes($scope.time.getMinutes());
		//It's a fucking string pretending to be a JSON so parse it first
		console.log(typeof $scope.selectedLocation);
		//$scope.selectedLocation = JSON.parse($scope.selectedLocation);
		$scope.selectedLocation = $scope.selectedLocation;
		newEvent.location = new Parse.GeoPoint($scope.selectedLocation.lat, $scope.selectedLocation.lng);
		console.log(newEvent);
		eventService.createEvent(newEvent);
		$scope.newEvent = {title: ""}
		$scope.searchString = '';
		$scope.time = null;

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

