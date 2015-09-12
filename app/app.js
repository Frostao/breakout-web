(function () {
'use strict';
var app = angular.module('breakoutApp', ['ngRoute', 'uiGmapgoogle-maps', 'breakout.list', 'breakout.maps', 'breakout.random', 'breakout.flyerPost']);

app.config(function($routeProvider) {
    $routeProvider
         .when('/flyerPost', {
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
        .when('/', {
            templateUrl : 'homepage.html',
        })
        .otherwise({
            redirectTo: 'homepage.html'
        });
});

app.service('eventService', function() {
    Parse.initialize("jJSrrrkKceel592bL1fRYbjTePkOUkP9wSnaMi3o", "pDCMBfg3YDx3I5fbZUwKNPAJJyYPKMeW9ct02Nfa");
    var Event = Parse.Object.extend("Event");

    this.createEvent = function(newEvent) {
        var e = new Event();
        e.save(newEvent).then(function(object) {
            alert("it worked?");
        });
    }

    this.getEvents = function() {
        var queryObject = new Parse.Query(Event);

        queryObject.find({
            success: function(results) {
                console.log(results);
                return results;
            },
            error: function(error) {
                console.log("eek");
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }

});

$(document).ready(function () {

  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
     isClosed = false;

  var trigger2 = $('.sidebarButton'),
      overlay = $('.overlay'),
     isClosed = false;

    trigger.click(function () {
      hamburger_cross();      
    });

    trigger2.click(function () {
      hamburger_cross();      
    });

    function hamburger_cross() {

      if (isClosed == true) {          
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {   
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
  }
  
  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  });  
});

})();


