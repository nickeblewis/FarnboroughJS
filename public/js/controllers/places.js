angular.module('mean.places').controller('PlacesController', ['$scope', '$routeParams', '$location', 'Global', 'Places', function ($scope, $routeParams, $location, Global, Places) {
    $scope.global = Global;
    
    angular.extend($scope, {
        center: {
            lat: 51.293,
            lng: -0.75,
            zoom: 18
        },
        markers: {
            m1: {
                lat: 51.293,
                lng: -0.75,
                message: "Grab this marker in order to set the new location!",
                focus: true,
                draggable:  true
        }
    },
    defaults: {
        tileLayer: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
        zoomControlPosition: 'topright',
        tileLayerOptions: {
            opacity: 0.9,
            detectRetina: true,
            reuseTiles: true,
        },
        scrollWheelZoom: false
    }
    });

    $scope.create = function() {
        var place = new Places({
            title: this.title,
            content: this.content,
            lat: this.lat,
            lng: this.lng
        });
        place.$save(function(response) {
            $location.path("places/" + response._id);
        });

        this.title = "";
        this.content = "";
    };

    $scope.remove = function(place) {
        place.$remove();  

        for (var i in $scope.places) {
            if ($scope.places[i] == place) {
                $scope.places.splice(i, 1);
            }
        }
    };

    $scope.update = function() {
        var place = $scope.place;
        if (!place.updated) {
            place.updated = [];
        }

        place.lat = $scope.markers.m1.lat;
        place.lng = $scope.markers.m1.lng;

        place.updated.push(new Date().getTime());

        place.$update(function() {
            $location.path('places/' + place._id);
        });
    };

    $scope.find = function() {
        Places.query(function(places) {
            $scope.places = places;
        });
    };

    $scope.findOne = function() {
        Places.get({
            placeId: $routeParams.placeId
        }, function(place) {
            $scope.place = place;
            $scope.center.lat = place.lat;
            $scope.center.lng = place.lng;
            $scope.markers.m1.lat = place.lat;
            $scope.markers.m1.lng = place.lng;
        });
    };
}]);