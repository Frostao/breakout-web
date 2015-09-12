var app = angular.module('breakout.flyerPost', ['breakoutApp']);

app.controller('flyerPostController', ['$scope', 'eventService', function($scope, eventService) {
	$scope.newEvent = {title: ""}

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
		$scope.newEvent.date.setTime($scope.time);
		eventService.createEvent(newEvent);
	}
}]);

