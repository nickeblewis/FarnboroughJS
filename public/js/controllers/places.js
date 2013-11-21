angular.module('mean.places').controller('PlacesController', ['$scope', '$routeParams', '$location', 'Global', 'Places', function ($scope, $routeParams, $location, Global, Places) {
    $scope.global = Global;

    angular.extend($scope, {
        center: {
            lat: 51.293,
            lng: -0.75,
            zoom: 16
        },
        marker: {
            lat: 51.293,
            lng: -0.75,
            focus: true,
            draggable: true

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
        maxZoom: 18,
        minZoom: 1,
        zoom: 6,
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
            lat: $scope.marker.lat,
            lng: $scope.marker.lng,
            address: {
                contact: this.contact,
                number: this.number,
                street: this.street,
                postcode: this.postcode,
                telephone: this.telephone,
                fax: this.fax,
                email: this.email
            }
            // ,
            // website: {
            //     title: this.wtitle,
            //     url: url
            // }
        });

        place.$save(function(response) {
            $location.path("places/" + response._id);
        });

        this.title = "";
        this.content = "";
        this.lat = 51.293;
        this.lng = -0.75;
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

        place.lat = $scope.marker.lat;
        place.lng = $scope.marker.lng;

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
            $scope.marker.lat = place.lat;
            $scope.marker.lng = place.lng;
        });
    };
}]);