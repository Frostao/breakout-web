var app = angular.module('breakout.list', ['breakoutApp']);

app.controller('listController', ['$scope', 'Event', '$http', function($scope, Event, $http) {
	// Your Client ID can be retrieved from your project in the Google
      // Developer Console, https://console.developers.google.com
      var CLIENT_ID = '374302211520-1oh28djcutk0svl5m3ucvkaspqmcmdd3.apps.googleusercontent.com';

      var SCOPES = ["https://www.googleapis.com/auth/calendar"];

      /**
       * Check if current user has authorized this application.
       */
      $scope.checkAuth = function() {
        gapi.auth.authorize(
          {
            'client_id': CLIENT_ID,
            'scope': SCOPES,
            'immediate': true
          }, handleAuthResult);
      }

      /**
       * Handle response from authorization server.
       *
       * @param {Object} authResult Authorization result.
       */
      function handleAuthResult(authResult) {
        var authorizeDiv = document.getElementById('authorize_google');
        if (authResult && !authResult.error) {
          // Hide auth UI, then load client library.
          authorizeDiv.style.display = 'none';
          loadCalendarApi();
        } else {
          // Show auth UI, allowing the user to initiate authorization by
          // clicking authorize button.
          authorizeDiv.style.display = 'inline';
        }
      }

      /**
       * Initiate auth flow in response to user clicking authorize button.
       *
       * @param {Event} event Button click event.
       */
      $scope.handleAuthClick = function(event) {
        gapi.auth.authorize(
          {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
          handleAuthResult);
        return false;
      }

      /**
       * Load Google Calendar client library. List upcoming events
       * once client library is loaded.
       */
      function loadCalendarApi() {
        gapi.client.load('calendar', 'v3', listUpcomingEvents);
      }

 	Event.getEvents().then(function(results) {
		//console.log(results);
		$scope.events = results;
	}, function(error) {
		console.log(error);
	});

	$scope.coodToName = function(tuple) {
		$http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+tuple.latitude+","+tuple.longitude+"&key=AIzaSyDe8sRSaGxnJ2h4X1DZfA9W5ee2XGWfO5k")
    	.success(function(response) {
    		return response.data[0].formatted_address;
    	});	
	}
 	
}]);