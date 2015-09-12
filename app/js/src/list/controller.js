var app = angular.module('breakout.list', ['breakoutApp']);

app.controller('listController', ['$scope', 'eventService', function($scope, eventService) {
 	$scope.getEvents = function() {
 		//Doesn't work because the query doesn't return an array of events
 		//And even if it did i forgot to populate the fields of the objects
 		console.log(eventService.getEvents());
 		return eventService.getEvents();
 	}
}]);
