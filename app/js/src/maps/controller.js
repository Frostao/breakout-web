var app = angular.module('breakout.maps', ['breakoutApp']);

//Data
var cities = [
    {
        city : 'Ann Arbor',
        desc : 'MHacks 6',
        lat : 42.2927223,
        long : -83.7162022,
        image: 'http://news.mlh.io/wp-content/uploads/2014/09/MHacks.png'
    }
];

app.controller('mapsController', ['$scope', 'Event', function($scope, Event) {
    cities = [
      {
        city : 'Ann Arbor',
        desc : 'MHacks 6',
        lat : 42.2927223,
        long : -83.7162022,
        image: 'http://news.mlh.io/wp-content/uploads/2014/09/MHacks.png'
      }
    ];

    Event.getEvents().then(function(results) {
      var events = results;
      for(var i = 0; i < events.length; i++) {
         var city = {};
        city.desc = events[i].title;
        city.city = "foo";
        city.lat = events[i].location.latitude;
        city.long = events[i].location.longitude;
        city.image = events[i].flyer.url();
        cities.push(city);
      }

      for (i = 0; i < cities.length; i++){
        createMarker(cities[i]);
      }

    }, function(error) {
      console.log(error);
    });


    $scope.initMap = function() {
      $scope.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 42.2927223, lng: -83.7162022},
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.TERRAIN
      });
      var infoWindow = new google.maps.InfoWindow({map: $scope.map});

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent('You are here!');
          $scope.map.setCenter(pos);
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
    }
    $scope.initMap();

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
    }

    $scope.markers = [];
    
    var infoWindow = new google.maps.InfoWindow();
    
    var createMarker = function (info){
        
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.long),
            title: info.desc,
            description: info.desc
        });
        marker.content = "<div class='infoWindowContent'><img height='200' width='200' src="+info.image+"><br />"+ info.desc + '<a href="/#/flyerPost" type="button" class="btn btn-primary btn-sm btn3d"><span class="glyphicon glyphicon-ok-circle"></span>Add to calendar</a></div>';
        
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });
        
        $scope.markers.push(marker);
    }  

    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }
 
}]);

