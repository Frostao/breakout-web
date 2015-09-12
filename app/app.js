(function () {
'use strict';
var app = angular.module('breakoutApp', ['ngRoute', 'breakout.list', 'breakout.maps', 'breakout.random', 'breakout.flyerPost']);

app.config(function($routeProvider) {
    $routeProvider
         .when('/', {
            templateUrl : 'js/src/flyerPost/flyerPost.html',
            controllerUrl  : 'js/src/flyerPost/controller.js'
        })
        .when('/maps', {
            templateUrl : 'js/src/maps/maps-view-tmpl.html',
            controllerUrl  : 'js/src/maps/controller.js'
        })
        .when('/list', {
            templateUrl : 'js/src/list/list-view-tmpl.html',
            controllerUrl : 'js/src/list/controller.js'
        })
        .when('/random', {
            templateUrl : 'js/src/random/random-view-tmpl.html',
            controllerUrl : 'js/src/random/controller.js'
        })
        .otherwise({
            redirectTo: '/'
        });
});

app.service('eventService', function() {
    Parse.initialize("jJSrrrkKceel592bL1fRYbjTePkOUkP9wSnaMi3o", "pDCMBfg3YDx3I5fbZUwKNPAJJyYPKMeW9ct02Nfa");

    this.createEvent = function(newEvent) {
        console.log(newEvent);
        var Event = Parse.Object.extend("Event");
        var e = new Event();
        e.save(newEvent).then(function(object) {
            alert("it worked?");
        });
    }

});

})();


