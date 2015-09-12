var app = angular.module('breakout.list', ['breakoutApp']);

app.controller('listController', ['$scope', 'Event', function($scope, Event) {
 	Event.getEvents().then(function(results) {
		//console.log(results);
		$scope.events = results;
	}, function(error) {
		console.log(error);
	});
 	
}]);
