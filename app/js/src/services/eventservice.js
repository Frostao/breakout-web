var app = angular.module('myApp', []);

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