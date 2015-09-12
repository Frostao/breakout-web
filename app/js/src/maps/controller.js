var app = angular.module('breakout.maps', []);

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

app.controller('mapsController', ['$scope', function($scope) {
	var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(42.2927223, -83.7162022),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];
    
    var infoWindow = new google.maps.InfoWindow();
    
    var createMarker = function (info){
        
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.long),
            title: info.city
        });
        marker.content = "<div class='infoWindowContent'><img height='200' width='200' src="+info.image+"><br />"+ info.desc + '<a href="/#/flyerPost" type="button" class="btn btn-primary btn-sm btn3d"><span class="glyphicon glyphicon-ok-circle"></span>Add to calendar</a></div>';
        
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });
        
        $scope.markers.push(marker);
        
    }  
    
    for (i = 0; i < cities.length; i++){
        createMarker(cities[i]);
    }

    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }
 
}]);
