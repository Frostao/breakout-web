(function () {
'use strict';
var app = angular.module('breakoutApp', ['ngRoute', 'uiGmapgoogle-maps', 'breakout.list', 'breakout.maps', 'breakout.random', 'breakout.flyerPost']);

app.config(function($routeProvider) {

    Parse.initialize("jJSrrrkKceel592bL1fRYbjTePkOUkP9wSnaMi3o", "pDCMBfg3YDx3I5fbZUwKNPAJJyYPKMeW9ct02Nfa");
   
    
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
            templateUrl : 'js/src/aboutus/aboutus-view-tmpl.html',
            controllerUrl : 'js/src/aboutus/controller.js'
        })
        .when('/', {
            templateUrl : 'homepage.html',
        })
        .otherwise({
            redirectTo: 'homepage.html'
        });
});

app.run(['$rootScope', function($scope) {
  $scope.currentUser = Parse.User.current();

 
  $scope.signUp = function(form) {
    var user = new Parse.User();
    user.set("email", form.email);
    user.set("username", form.username);
    user.set("password", form.password);
    user.set("category", form.category);
 
    user.signUp(null, {
      success: function(user) {
        $scope.currentUser = user;
        alert("Congratulations!")
        $scope.$apply(); // Notify AngularJS to sync currentUser
      },
      error: function(user, error) {
        alert("Unable to sign up:  " + error.code + " " + error.message);
      }
    });    
  }
 
  $scope.logOut = function(form) {
    Parse.User.logOut();
    $scope.currentUser = null;
  }

  $scope.logIn = function(form) {
    Parse.User.logIn(form.username, form.password, {
      success: function(user) {
        $scope.currentUser = user;
        $scope.$apply();
      },
      error: function(user, error) {
        alert("Unable to log in: " + error.code + " " + error.message);
      }
    });
  }

}]);

app.service('eventService', function($q) {
     var Event = Parse.Object.extend("Event");

    this.createEvent = function(newEvent) {
        var e = new Event();
        e.save(newEvent).then(function(object) {
            alert("it worked?");
        });
    }

    this.getEvents = function() {
        var queryObject = new Parse.Query(Event);

        var defer = $q.defer();

        queryObject.find({
            success: function(results) {
                //console.log(results);
                defer.resolve(results);
            },
            error: function(error) {
                defer.reject(error);
            }
        });

        return defer.promise;
    }

});

app.factory('Event', function($q) {
 
    var Event = Parse.Object.extend("Event", {
      // Instance methods
    }, {
      // Class methods
 
      getNearbyEvents : function(userLocation, distance) {
        var defer = $q.defer();
 
        var query = new Parse.Query(this);
        query.withinKilometers('location', userLocation, distance);

        query.find({
          success : function(events) {
            defer.resolve(events);
          },
          error : function(error) {
            defer.reject(error);
          }
        });
        return defer.promise;
      },

      getEvents : function() {
        var defer = $q.defer();
 
        var query = new Parse.Query(this);

        query.find({
          success : function(events) {
            defer.resolve(events);
          },
          error : function(error) {
            defer.reject(error);
          }
        });
 
        return defer.promise;
      }
    });
 
    // Properties
    Event.prototype.__defineGetter__("title", function() {
      return this.get("title");
    });
    Event.prototype.__defineSetter__("title", function(aValue) {
      return this.set("title", aValue);
    });
    Event.prototype.__defineGetter__("date", function() {
      return this.get("date");
    });
    Event.prototype.__defineSetter__("date", function(aValue) {
      return this.set("date", aValue);
    });
    Event.prototype.__defineGetter__("category", function() {
      return this.get("category");
    });
    Event.prototype.__defineSetter__("category", function(aValue) {
      return this.set("category", aValue);
    });
    Event.prototype.__defineGetter__("flyer", function() {
      return this.get("flyer");
    });
    Event.prototype.__defineSetter__("flyer", function(aValue) {
      return this.set("flyer", aValue);
    });
    Event.prototype.__defineGetter__("location", function() {
      return this.get("location");
    });
    Event.prototype.__defineSetter__("location", function(aValue) {
      return this.set("location", aValue);
    });
    Event.prototype.__defineGetter__("placename", function() {
      return this.get("placename");
    });
    Event.prototype.__defineSetter__("placename", function(aValue) {
      return this.set("placename", aValue);
    });
 
    return Event;
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


