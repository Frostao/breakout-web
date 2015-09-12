var app = angular.module('breakout.flyerPost', []);

app.service('eventService', function() {
    Parse.initialize("jJSrrrkKceel592bL1fRYbjTePkOUkP9wSnaMi3o", "pDCMBfg3YDx3I5fbZUwKNPAJJyYPKMeW9ct02Nfa");

    this.createEvent = function(newEvent) {
        var Event = Parse.Object.extend("Event");
        var e = new Event();
        e.save(newEvent).then(function(object) {
            alert("it worked?");
        });
    }

});

app.controller('flyerPostController', ['$scope', 'eventService', function($scope, eventService) {
	$scope.newEvent = {title: ""}

	$scope.createEvent = function(newEvent) {
		eventService.createEvent(newEvent);
	}
}]);

